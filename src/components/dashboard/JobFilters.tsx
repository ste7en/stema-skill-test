'use client'

import { useFilters } from '@/hooks/useFilters'
import { useAuthStore } from '@/store/useAuthStore'
import { JobFilters as JobFiltersType } from '@/types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, ResetIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'

interface JobFiltersProps {
  onFiltersChange: (filters: JobFiltersType) => void
  filters: JobFiltersType
}

export function JobFilters({ onFiltersChange, filters }: JobFiltersProps) {
  const { data: filterOptions } = useFilters()
  const { user } = useAuthStore()

  const handleFilterChange = (update: Partial<JobFiltersType>) => {
    const newFilters = { ...filters, ...update }
    // If matchProfile is disabled, clear match-related filters
    if (update.hasOwnProperty('matchProfile') && !update.matchProfile) {
      newFilters.minMatchScore = undefined
      newFilters.cluster = undefined
    }
    onFiltersChange(newFilters)
  }

  const handleReset = () => {
    onFiltersChange({})
  }

  if (!filterOptions) return null

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '')

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Filters</h3>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleReset}
              className="h-8 px-2 lg:px-3"
            >
              <ResetIcon className="mr-2 h-4 w-4" />
              Reset
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search jobs..."
            value={filters.searchQuery || ''}
            onChange={(e) => handleFilterChange({ searchQuery: e.target.value })}
          />
        </div>

        {/* Date Filter */}
        <div className="space-y-2">
          <Label>Published After</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.publishedAfter ? (
                  format(new Date(filters.publishedAfter), 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.publishedAfter ? new Date(filters.publishedAfter) : undefined}
                onSelect={(date) => handleFilterChange({ 
                  publishedAfter: date ? date.toISOString() : undefined 
                })}
                disabled={(date) => {
                  const minDate = new Date(filterOptions.dateRange.min)
                  const maxDate = new Date(filterOptions.dateRange.max)
                  return date < minDate || date > maxDate
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Match-based filters (only for authenticated users) */}
        {user && (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="matchProfile">Match with Profile</Label>
                <Switch
                  id="matchProfile"
                  checked={filters.matchProfile || false}
                  onCheckedChange={(checked) => handleFilterChange({ matchProfile: checked })}
                />
              </div>
            </div>

            {filters.matchProfile && filterOptions.matchScoreRange && (
              <div className="space-y-4">
                <Label>Minimum Match Score</Label>
                <Slider
                  min={Math.floor(filterOptions.matchScoreRange.min)}
                  max={Math.ceil(filterOptions.matchScoreRange.max)}
                  step={1}
                  value={[filters.minMatchScore || filterOptions.matchScoreRange.min]}
                  onValueChange={([value]) => handleFilterChange({ minMatchScore: value })}
                />
                <div className="text-sm text-muted-foreground text-center">
                  {filters.minMatchScore || Math.floor(filterOptions.matchScoreRange.min)}%
                </div>
              </div>
            )}

            {filters.matchProfile && filterOptions.clusters && filterOptions.clusters.length > 0 && (
              <div className="space-y-2">
                <Label>Cluster</Label>
                <Select
                  value={filters.cluster || ''}
                  onValueChange={(value) => {
                    if (filters.cluster === value) {
                      handleFilterChange({ cluster: undefined })
                    } else {
                      handleFilterChange({ cluster: value || undefined })
                    }
                  }}

                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select cluster" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.clusters.map((cluster) => (
                      <SelectItem key={cluster} value={cluster}>
                        {cluster}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
} 