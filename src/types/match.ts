export interface Match {
  id: number
  jobseeker_id: string
  job_id: number
  job_match_score: number
  jobseeker_cluster: string
  experience_score: number
  location_score: number
  background_score: number
  role_score: number
  corporate_function_score: number
  ral_score: number
  match_creation_date_time: string
} 