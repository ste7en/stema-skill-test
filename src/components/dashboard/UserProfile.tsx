'use client'

import { useAuthStore } from '@/store/useAuthStore'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function UserProfile() {
  const { user } = useAuthStore()

  if (!user) return null

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarFallback>
              {user.first_name?.[0]}{user.last_name?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-muted-foreground">{user.job_title || 'No job title'}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-1">Background</h3>
          <p className="text-sm text-muted-foreground">
            {user.background_name || 'Not specified'}
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-1">Experience</h3>
          <p className="text-sm text-muted-foreground">
            {user.experience_name || 'Not specified'}
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-1">Location</h3>
          <p className="text-sm text-muted-foreground">
            {user.province_name || 'Not specified'}
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-1">Expected Salary Range</h3>
          <p className="text-sm text-muted-foreground">
            {user.ral_range || 'Not specified'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 