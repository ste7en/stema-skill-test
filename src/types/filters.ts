export interface FiltersResponse {
  dateRange: {
    min: string
    max: string
  }
  clusters?: string[]
  matchScoreRange?: {
    min: number
    max: number
  } | null
  matchProfile?: boolean
}
