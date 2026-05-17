import { matchPath } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'

export type BreadcrumbDef =
  | { type: 'text'; label: string }
  | { type: 'link'; label: string; to: string }

const userDetailPath = `${ROUTES.users}/:id`
const userEditPath = `${ROUTES.users}/:id/edit`

export function getUsersBreadcrumbDefs(
  pathname: string,
  id?: string,
): BreadcrumbDef[] {
  if (pathname === ROUTES.users) {
    return [{ type: 'text', label: 'Users' }]
  }

  if (id && matchPath({ path: userEditPath, end: true }, pathname)) {
    return [
      { type: 'link', label: 'Users', to: ROUTES.users },
      { type: 'link', label: `User #${id}`, to: ROUTES.userDetail(id) },
      { type: 'text', label: 'Edit' },
    ]
  }

  if (id && matchPath({ path: userDetailPath, end: true }, pathname)) {
    return [
      { type: 'link', label: 'Users', to: ROUTES.users },
      { type: 'text', label: `User #${id}` },
    ]
  }

  return [{ type: 'link', label: 'Users', to: ROUTES.users }]
}
