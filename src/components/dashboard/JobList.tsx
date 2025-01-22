'use client'

import { useState } from 'react'
import { useJobs } from '@/hooks/useJobs'
import { JobCard } from './JobCard'
import { JobFilters } from './JobFilters'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { JobFilters as JobFiltersType } from '@/types'

export function JobList() {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<JobFiltersType>({})
  const { data, isLoading, isFetching, isError, error } = useJobs({ page, filters })

  const handleFiltersChange = (newFilters: JobFiltersType) => {
    setFilters(newFilters)
    setPage(1) // Reset to first page when filters change
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[200px] w-full" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center py-8 space-y-4">
        <p className="text-muted-foreground">
          {error instanceof Error ? error.message : 'Failed to load jobs'}
        </p>
        <Button 
          variant="outline" 
          onClick={() => setPage(1)}
        >
          Try Again
        </Button>
      </div>
    )
  }

  if (!data?.jobs.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No jobs found</p>
      </div>
    )
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNextPage = () => {
    if (page < data.pagination.totalPages) {
      setPage(page + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <JobFilters onFiltersChange={handleFiltersChange} />

      {/* Loading overlay */}
      {isFetching && (
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-[200px] w-full" />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {data.jobs.map((job) => (
          <JobCard key={job.job_id} job={job} />
        ))}
      </div>

      {/* Pagination */}
      {data.pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            disabled={page === 1 || isFetching}
            onClick={handlePreviousPage}
          >
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Page {page} of {data.pagination.totalPages}
            </span>
          </div>
          <Button
            variant="outline"
            disabled={page === data.pagination.totalPages || isFetching}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
} 