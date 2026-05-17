import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi } from '../api/usersApi'
import { usersQueryKeys } from '../api/queryKeys'
import type { UsersResponse } from '../types/api'
import type { UpdateUserPayload, User } from '../types/user'
import { mergeUpdatedUser } from '../utils/mergeUpdatedUser'

export interface UpdateUserMutationVariables {
  id: number
  payload: UpdateUserPayload
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient()

  return useMutation<User, Error, UpdateUserMutationVariables>({
    mutationFn: ({ id, payload }) => usersApi.updateUser(id, payload),
    onSuccess: (apiUser, { id, payload }) => {
      const cachedDetail = queryClient.getQueryData<User>(
        usersQueryKeys.detail(id),
      )
      const mergedUser = mergeUpdatedUser(cachedDetail, apiUser, payload)

      queryClient.setQueryData(usersQueryKeys.detail(id), mergedUser)

      queryClient.setQueriesData<UsersResponse>(
        { queryKey: usersQueryKeys.lists() },
        (cachedList) => {
          if (!cachedList) {
            return cachedList
          }

          return {
            ...cachedList,
            users: cachedList.users.map((user) =>
              user.id === id
                ? mergeUpdatedUser(user, apiUser, payload)
                : user,
            ),
          }
        },
      )
    },
  })
}
