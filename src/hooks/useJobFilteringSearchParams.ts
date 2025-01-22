import { JobFilters } from "@/types"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo } from "react"

export function useJobFilteringSearchParams() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const filters: JobFilters = useMemo(() => ({
    searchQuery: searchParams.get('q') || undefined,
    publishedAfter: searchParams.get('publishedAfter') || undefined,
    matchProfile: searchParams.get('matchProfile') === 'true',
    minMatchScore: searchParams.get('minMatchScore') ? 
      Number(searchParams.get('minMatchScore')) : undefined,
    cluster: searchParams.get('cluster') || undefined,
  }), [searchParams])

  const onFiltersChange = useCallback((newFilters: JobFilters) => {
    const params = new URLSearchParams()
    
    if (newFilters.searchQuery) params.set('q', newFilters.searchQuery)
    if (newFilters.publishedAfter) params.set('publishedAfter', newFilters.publishedAfter)
    if (newFilters.matchProfile) params.set('matchProfile', 'true')
    if (newFilters.minMatchScore) params.set('minMatchScore', String(newFilters.minMatchScore))
    if (newFilters.cluster) params.set('cluster', newFilters.cluster)

    router.push(`/dashboard?${params.toString()}`)
  }, [router])

  return { filters, onFiltersChange }
}