import type { UsersListParams, UsersSearchParams } from '../types/api'

export const usersQueryKeys = {
  all: ['users'] as const,
  lists: () => [...usersQueryKeys.all, 'list'] as const,
  list: (params: UsersListParams) =>
    [...usersQueryKeys.lists(), params] as const,
  searches: () => [...usersQueryKeys.all, 'search'] as const,
  search: (params: UsersSearchParams) =>
    [...usersQueryKeys.searches(), params] as const,
  details: () => [...usersQueryKeys.all, 'detail'] as const,
  detail: (id: number | string) =>
    [...usersQueryKeys.details(), id] as const,
} as const
