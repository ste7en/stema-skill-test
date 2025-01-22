export interface Job {
  job_id: number
  job_title: string
  content_html: string
  corporate_function_id: number
  employer_id: string
  apply_type: string
  apply_url: string | null
  apply_email: string | null
  platform_url: string
  status: string
  published_date_time: string
  removed_date_time: string | null
  updated_date_time: string | null
  priority_factor: number
} 