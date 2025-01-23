'use client'

import { useState } from 'react'
import { JobWithMatch } from '@/types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/useAuthStore'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'

interface JobCardProps {
  job: JobWithMatch
}

export function JobCard({ job }: JobCardProps) {
  const { user } = useAuthStore()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-lg font-semibold">{job.job_title}</h3>
            {user && job.match && (
              <div className="flex items-center gap-2 mt-1">
                <div className="text-sm font-medium">
                  Match Score: {Math.round(job.match.score)}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Cluster: {job.match.cluster}
                </div>
              </div>
            )}
          </div>
          <Button 
            variant="secondary" 
            onClick={() => window.open(job.apply_url || job.platform_url, '_blank')}
          >
            Apply Now
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div 
              className={`prose prose-sm max-w-none ${!isExpanded ? "line-clamp-4" : ""}`}
              dangerouslySetInnerHTML={{ __html: job.content_html }} 
            />
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 h-8 px-2"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  <ChevronUpIcon className="mr-2 h-4 w-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDownIcon className="mr-2 h-4 w-4" />
                  Show More
                </>
              )}
            </Button>
          </div>
          {user && job.match && (
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm font-medium">Experience Match</p>
                <p className="text-sm text-muted-foreground">
                  {Math.round(job.match.experience_score)}%
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Location Match</p>
                <p className="text-sm text-muted-foreground">
                  {Math.round(job.match.location_score)}%
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Background Match</p>
                <p className="text-sm text-muted-foreground">
                  {Math.round(job.match.background_score)}%
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Role Match</p>
                <p className="text-sm text-muted-foreground">
                  {Math.round(job.match.role_score)}%
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 