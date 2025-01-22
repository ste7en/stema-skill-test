'use client'

import { UserProfile } from '@/components/dashboard/UserProfile'
import { JobList } from '@/components/dashboard/JobList'

export default function DashboardPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="grid grid-cols-12 gap-6">
        {/* User Profile Section */}
        <div className="col-span-12 lg:col-span-4">
          <UserProfile />
        </div>
      </div>
    </div>
  )
} 