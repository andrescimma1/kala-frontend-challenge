import type { UpdateUserPayload, User } from '../types/user'

export function mergeUpdatedUser(
  existing: User | undefined,
  apiResponse: User,
  payload: UpdateUserPayload,
): User {
  const base = existing ?? apiResponse

  return {
    ...base,
    ...apiResponse,
    ...payload,
    id: base.id,
    company: {
      ...base.company,
      ...apiResponse.company,
      ...(payload.company ?? {}),
      address: payload.company?.address ?? apiResponse.company?.address ?? base.company.address,
    },
  }
}
