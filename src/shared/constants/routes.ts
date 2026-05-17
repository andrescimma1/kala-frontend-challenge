export const ROUTES = {
  home: '/',
  users: '/users',
  userDetail: (id: string | number) => `/users/${id}`,
  userEdit: (id: string | number) => `/users/${id}/edit`,
} as const
