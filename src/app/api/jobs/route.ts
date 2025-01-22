import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jobs from '@/data/job.json'
import matches from '@/data/match.json'
import jobseekers from '@/data/jobseeker.json'
import { JobSeeker } from '@/types/jobseeker'
import { Job } from '@/types/job'
import { ErrorResponse, JobFilters, JobWithMatch, Match, PaginatedResponse } from '@/types'

const ITEMS_PER_PAGE = 5

export async function GET(request: Request): Promise<NextResponse<PaginatedResponse<{ jobs: JobWithMatch[] }> | ErrorResponse>> {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const filters: JobFilters = {
      matchProfile: searchParams.get('matchProfile') === 'true',
      searchQuery: searchParams.get('q') || undefined,
      minMatchScore: searchParams.get('minMatchScore') ? 
        parseFloat(searchParams.get('minMatchScore')!) : undefined,
      publishedAfter: searchParams.get('publishedAfter') || undefined,
      cluster: searchParams.get('cluster') || undefined,
    }

    // Get user ID from cookie for profile matching
    const userId = cookies().get('user-id')?.value
    const user = userId ? 
      (jobseekers as JobSeeker[]).find(j => j.jobseeker_id === userId) : 
      null

    // Filter jobs
    let filteredJobs = [...(jobs as Job[])]

    // Text search in job title and content
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filteredJobs = filteredJobs.filter(job => 
        job.job_title.toLowerCase().includes(query) ||
        job.content_html?.toLowerCase().includes(query)
      )
    }

    // Publication date filter
    if (filters.publishedAfter) {
      const publishedAfter = filters.publishedAfter
      filteredJobs = filteredJobs.filter(job => 
        job.published_date_time >= publishedAfter
      )
    }

    // Match profile and related filters
    if (user && (filters.matchProfile || filters.minMatchScore || filters.cluster)) {
      const userMatches = (matches as Match[]).filter(m => m.jobseeker_id === userId)
      
      // Create a map for quick match lookup
      const matchMap = new Map(
        userMatches.map(match => [match.job_id, match])
      )

      filteredJobs = filteredJobs.filter(job => {
        const match = matchMap.get(job.job_id)
        if (!match) return false

        // Check minimum match score
        if (filters.minMatchScore && match.job_match_score < filters.minMatchScore) {
          return false
        }

        // Check cluster
        if (filters.cluster && match.jobseeker_cluster !== filters.cluster) {
          return false
        }

        return true
      })

      // Sort by match score
      filteredJobs.sort((a, b) => {
        const scoreA = matchMap.get(a.job_id)?.job_match_score || 0
        const scoreB = matchMap.get(b.job_id)?.job_match_score || 0
        return scoreB - scoreA
      })
    }

    // Apply pagination
    const totalItems = filteredJobs.length
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const paginatedJobs = filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    // Add match information to jobs if user is authenticated
    const jobsWithMatches = paginatedJobs.map(job => {
      if (!userId) return job

      const match = (matches as Match[]).find(m => 
        m.job_id === job.job_id && m.jobseeker_id === userId
      )

      return {
        ...job,
        match: match ? {
          score: match.job_match_score,
          cluster: match.jobseeker_cluster,
          experience_score: match.experience_score,
          location_score: match.location_score,
          background_score: match.background_score,
          role_score: match.role_score,
          corporate_function_score: match.corporate_function_score,
          ral_score: match.ral_score,
        } : null
      }
    })

    return NextResponse.json({
      jobs: jobsWithMatches,
      pagination: {
        page,
        totalPages,
        totalItems,
        itemsPerPage: ITEMS_PER_PAGE
      }
    })
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    )
  }
} 