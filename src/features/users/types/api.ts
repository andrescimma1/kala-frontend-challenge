import type { User } from './user'

export interface PaginationParams {
  limit: number
  skip: number
}

export interface UsersListParams extends PaginationParams {}

export interface UsersSearchParams extends PaginationParams {
  q: string
}

export interface PaginatedUsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}
