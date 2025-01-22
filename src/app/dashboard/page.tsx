'use client'

import { UserProfile } from '@/components/dashboard/UserProfile'
import { JobList } from '@/components/dashboard/JobList'
import { JobFilters } from '@/components/dashboard/JobFilters'
import { useState } from 'react'
import { JobFilters as JobFiltersType } from '@/types'

export default function DashboardPage() {
  const [filters, setFilters] = useState<JobFiltersType>({})

  return (
    <div className="container py-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: User Profile and Filters */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <UserProfile />
          <JobFilters filters={filters} onFiltersChange={setFilters} />
        </div>
        {/* Right Column: Jobs List */}
        <div className="col-span-12 lg:col-span-8">
          <JobList filters={filters} />
        </div>
      </div>
    </div>
  )
} 