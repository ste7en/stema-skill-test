import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jobs from '@/data/job.json'
import matches from '@/data/match.json'
import { Job, Match, FiltersResponse, ErrorResponse } from '@/types'

export async function GET(): Promise<NextResponse<{ filters: FiltersResponse } | ErrorResponse>> {
  try {
    // Get user ID from cookie to determine if we should include match-based filters
    const userId = cookies().get('user-id')?.value

    // Get date range
    const dates = (jobs as Job[])
      .map(job => job.published_date_time)
      .filter(Boolean)
      .sort()
    const oldestDate = dates[0]
    const newestDate = dates[dates.length - 1]

    // Get clusters if user is authenticated
    let clusters: string[] = []
    if (userId) {
      clusters = Array.from(
        new Set(
          (matches as Match[])
            .filter(m => m.jobseeker_id === userId)
            .map(m => m.jobseeker_cluster)
        )
      ).filter(Boolean).sort()
    }

    // Get match score range if user is authenticated
    let matchScoreRange: { min: number; max: number } | null = null
    if (userId) {
      const scores = (matches as Match[])
        .filter(m => m.jobseeker_id === userId)
        .map(m => m.job_match_score)
        .filter(Boolean)
      
      if (scores.length > 0) {
        matchScoreRange = {
          min: Math.min(...scores),
          max: Math.max(...scores)
        }
      }
    }

    return NextResponse.json({
      filters: {
        dateRange: {
          min: oldestDate,
          max: newestDate
        },
        // Only include match-based filters if user is authenticated
        ...(userId ? {
          clusters,
          matchScoreRange,
          matchProfile: true
        } : {})
      }
    })
  } catch (error) {
    console.error('Error fetching filters:', error)
    return NextResponse.json(
      { error: 'Failed to fetch filters' },
      { status: 500 }
    )
  }
} 