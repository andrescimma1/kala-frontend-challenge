import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi } from '../api/usersApi'
import { usersQueryKeys } from '../api/queryKeys'
import type { UpdateUserPayload, User } from '../types/user'

export interface UpdateUserVariables {
  id: number
  payload: UpdateUserPayload
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation<User, Error, UpdateUserVariables>({
    mutationFn: ({ id, payload }) => usersApi.updateUser(id, payload),
    onSuccess: (user, { id }) => {
      queryClient.setQueryData(usersQueryKeys.detail(id), user)
      void queryClient.invalidateQueries({ queryKey: usersQueryKeys.lists() })
      void queryClient.invalidateQueries({
        queryKey: usersQueryKeys.searches(),
      })
    },
  })
}
