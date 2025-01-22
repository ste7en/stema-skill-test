import { Job } from './job'

export interface JobWithMatch extends Job {
  match?: {
    score: number
    cluster: string
    experience_score: number
    location_score: number
    background_score: number
    role_score: number
    corporate_function_score: number
    ral_score: number
  } | null
} 