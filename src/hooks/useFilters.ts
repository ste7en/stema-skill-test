import { useQuery } from '@tanstack/react-query'
import { FiltersResponse } from '@/types'

async function fetchFilters(): Promise<FiltersResponse> {
  const response = await fetch('/api/jobs/filters')
  if (!response.ok) {
    throw new Error('Failed to fetch filters')
  }
  const data = await response.json()
  return data.filters
}

export function useFilters() {
  return useQuery({
    queryKey: ['filters'],
    queryFn: fetchFilters
  })
} 