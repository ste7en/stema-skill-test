import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { JobFilters, JobWithMatch, PaginatedResponse } from '@/types'

interface UseJobsParams {
  page?: number
  filters?: JobFilters
}

async function fetchJobs({ page = 1, filters }: UseJobsParams): Promise<PaginatedResponse<{ jobs: JobWithMatch[] }>> {
  const searchParams = new URLSearchParams()
  searchParams.set('page', page.toString())

  if (filters) {
    if (filters.matchProfile) searchParams.set('matchProfile', 'true')
    if (filters.searchQuery) searchParams.set('q', filters.searchQuery)
    if (filters.minMatchScore) searchParams.set('minMatchScore', filters.minMatchScore.toString())
    if (filters.publishedAfter) searchParams.set('publishedAfter', filters.publishedAfter)
    if (filters.cluster) searchParams.set('cluster', filters.cluster)
  }

  const response = await fetch(`/api/jobs?${searchParams.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch jobs')
  }
  return response.json()
}

export function useJobs({ page = 1, filters }: UseJobsParams = {}) {
  return useQuery({
    queryKey: ['jobs', page, filters],
    queryFn: () => fetchJobs({ page, filters }),
    placeholderData: keepPreviousData
  })
} 