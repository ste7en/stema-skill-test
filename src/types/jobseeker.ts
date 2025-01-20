export interface JobSeeker {
  jobseeker_id: string
  corporate_function_id: number | null
  ral_id: number | null
  background_id: number | null
  experience_id: number | null
  province_id: number | null
  email: string
  first_name: string
  last_name: string
  job_title: string | null
  graduation_date: string | null
  years_of_experience: number | null
  job_search_status: string | null
  updated_date_time: string | null
  cv_url: string | null
  job_seeking_from: string | null
  note: string | null
  cv_link_drive: string | null
  cv_link_s3: string | null
  province_name: string | null
  ral_range: string | null
  background_name: string | null
  experience_name: string | null
  corporate_function_name: string | null
} 