export interface ErrorResponse {
  error: string
}

export type PaginatedResponse<T> = T & {
  pagination: {
    page: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
}