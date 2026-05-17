import type { User } from './user'

export interface UsersListParams {
  limit: number
  skip: number
}

export interface UsersSearchParams {
  q: string
  limit: number
  skip: number
}

export interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}
