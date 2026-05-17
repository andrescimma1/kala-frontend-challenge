import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi } from '../api/usersApi'
import { usersQueryKeys } from '../api/queryKeys'
import type { UpdateUserPayload, User } from '../types/user'

export interface UpdateUserMutationVariables {
  id: number
  payload: UpdateUserPayload
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient()

  return useMutation<User, Error, UpdateUserMutationVariables>({
    mutationFn: ({ id, payload }) => usersApi.updateUser(id, payload),
    onSuccess: (_user, { id }) => {
      void queryClient.invalidateQueries({
        queryKey: usersQueryKeys.detail(id),
      })
      void queryClient.invalidateQueries({
        queryKey: usersQueryKeys.lists(),
      })
    },
  })
}
