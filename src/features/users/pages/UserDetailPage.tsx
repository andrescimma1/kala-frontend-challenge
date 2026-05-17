import { Card, Space } from 'antd'
import { useParams } from 'react-router-dom'
import { UserDetailHeader } from '../components/UserDetailHeader'
import { UserDetailSections } from '../components/UserDetailSections'
import {
  UserDetailEmpty,
  UserDetailError,
  UserDetailLoading,
} from '../components/UserPageStates'
import { useUserQuery } from '../hooks/useUserQuery'
import { parseUserId } from '../utils/parseUserId'
import { resolveUserPageView } from '../utils/resolveUserPageView'
import '../styles/user-detail.scss'
import '../styles/user-states.scss'

const pageClassName = 'user-detail page-shell'

export function UserDetailPage() {
  const { id } = useParams<{ id: string }>()
  const userId = parseUserId(id)

  const { data: user, isLoading, isError, error, refetch, isFetched } =
    useUserQuery(id)

  const pageView = resolveUserPageView({
    userId,
    isLoading,
    isError,
    isFetched,
    hasUser: Boolean(user),
  })

  if (pageView === 'invalid-id') {
    return (
      <UserDetailEmpty
        className={pageClassName}
        title="Invalid user"
        description="The user ID in the URL is not valid."
      />
    )
  }

  if (pageView === 'loading') {
    return <UserDetailLoading className={pageClassName} />
  }

  if (pageView === 'error') {
    return (
      <UserDetailError
        className={pageClassName}
        message={error?.message}
        onRetry={() => void refetch()}
      />
    )
  }

  if (pageView === 'not-found') {
    return <UserDetailEmpty className={pageClassName} />
  }

  if (!user) {
    return <UserDetailLoading className={pageClassName} />
  }

  return (
    <Card bordered={false} className={pageClassName}>
      <Space direction="vertical" size={24} className="user-detail__content">
        <UserDetailHeader user={user} />
        <UserDetailSections user={user} />
      </Space>
    </Card>
  )
}
