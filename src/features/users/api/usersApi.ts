import { apiClient } from '@/lib/apiClient'
import type {
  UsersListParams,
  UsersResponse,
  UsersSearchParams,
} from '../types/api'
import type { UpdateUserPayload, User } from '../types/user'

const USERS_PATH = '/users'

export const usersApi = {
  getUsers(params: UsersListParams) {
    return apiClient
      .get<UsersResponse>(USERS_PATH, { params })
      .then((res) => res.data)
  },

  searchUsers(params: UsersSearchParams) {
    return apiClient
      .get<UsersResponse>(`${USERS_PATH}/search`, { params })
      .then((res) => res.data)
  },

  getUserById(id: number) {
    return apiClient.get<User>(`${USERS_PATH}/${id}`).then((res) => res.data)
  },

  updateUser(id: number, payload: UpdateUserPayload) {
    return apiClient
      .put<User>(`${USERS_PATH}/${id}`, payload)
      .then((res) => res.data)
  },
} as const
