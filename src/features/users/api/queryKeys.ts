export const usersQueryKeys = {
  all: ['users'] as const,
  list: (params: { limit: number; skip: number; search: string }) =>
    [...usersQueryKeys.all, 'list', params] as const,
  detail: (id: number | string) =>
    [...usersQueryKeys.all, 'detail', id] as const,
}
