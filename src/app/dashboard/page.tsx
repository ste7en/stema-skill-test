'use client'

import { UserProfile } from '@/components/dashboard/UserProfile'
import { JobList } from '@/components/dashboard/JobList'
import { JobFilters } from '@/components/dashboard/JobFilters'

export default function DashboardPage() {
  return (
    <div className="container py-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: User Profile and Filters (Sticky with independent scroll) */}
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-auto">
            <div className="space-y-6 pr-3">
              <UserProfile />
              <JobFilters />
            </div>
          </div>
        </div>
        {/* Right Column: Jobs List (Scrollable) */}
        <div className="col-span-12 lg:col-span-8">
          <div className="relative min-h-[calc(100vh-3rem)]">
            <JobList />
          </div>
        </div>
      </div>
    </div>
  )
} 