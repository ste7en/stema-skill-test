'use client'

import { UserProfile } from '@/components/dashboard/UserProfile'
import { JobList } from '@/components/dashboard/JobList'
import { JobFilters } from '@/components/dashboard/JobFilters'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

// Loading skeletons for components
function JobFiltersLoading() {
  return <Skeleton className="h-[400px] w-full" />
}

function JobListLoading() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-[200px] w-full" />
      ))}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="container py-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: User Profile and Filters (Sticky with independent scroll) */}
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-auto">
            <div className="space-y-6 pr-3">
              <UserProfile />
              <Suspense fallback={<JobFiltersLoading />}>
                <JobFilters />
              </Suspense>
            </div>
          </div>
        </div>
        {/* Right Column: Jobs List (Scrollable) */}
        <div className="col-span-12 lg:col-span-8">
          <div className="relative min-h-[calc(100vh-3rem)]">
            <Suspense fallback={<JobListLoading />}>
              <JobList />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
} 