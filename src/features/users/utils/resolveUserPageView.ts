export type UserPageView =
  | 'invalid-id'
  | 'loading'
  | 'error'
  | 'not-found'
  | 'ready'

export function resolveUserPageView({
  userId,
  isLoading,
  isError,
  isFetched,
  hasUser,
}: {
  userId: number | null
  isLoading: boolean
  isError: boolean
  isFetched: boolean
  hasUser: boolean
}): UserPageView {
  if (userId === null) {
    return 'invalid-id'
  }

  if (isLoading) {
    return 'loading'
  }

  if (isError) {
    return 'error'
  }

  if (isFetched && !hasUser) {
    return 'not-found'
  }

  if (!hasUser) {
    return 'loading'
  }

  return 'ready'
}
