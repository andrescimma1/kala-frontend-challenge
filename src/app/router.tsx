import { createBrowserRouter, Navigate } from 'react-router-dom'
import { UserDetailPage } from '@/features/users/pages/UserDetailPage'
import { UserEditPage } from '@/features/users/pages/UserEditPage'
import { UsersListPage } from '@/features/users/pages/UsersListPage'
import { MainLayout } from '@/shared/components/layout/MainLayout'
import { ROUTES } from '@/shared/constants/routes'

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.users} replace />,
      },
      {
        path: 'users',
        element: <UsersListPage />,
      },
      {
        path: 'users/:id',
        element: <UserDetailPage />,
      },
      {
        path: 'users/:id/edit',
        element: <UserEditPage />,
      },
    ],
  },
])
