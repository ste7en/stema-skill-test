'use client'

import { UserProfile } from '@/components/dashboard/UserProfile'
import { JobList } from '@/components/dashboard/JobList'
import { JobFilters } from '@/components/dashboard/JobFilters'

export default function DashboardPage() {
  return (
    <div className="container py-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: User Profile and Filters */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <UserProfile />
          <JobFilters />
        </div>
        {/* Right Column: Jobs List */}
        <div className="col-span-12 lg:col-span-8">
          <JobList />
        </div>
      </div>
    </div>
  )
} 