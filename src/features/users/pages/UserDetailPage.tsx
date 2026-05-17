import { Card, Space } from 'antd'
import { useParams } from 'react-router-dom'
import { UserDetailHeader } from '../components/UserDetailHeader'
import { UserDetailSections } from '../components/UserDetailSections'
import {
  UserDetailEmpty,
  UserDetailError,
  UserDetailLoading,
} from '../components/UserDetailStates'
import { useUserQuery } from '../hooks/useUserQuery'
import { parseUserId } from '../utils/parseUserId'
import '../styles/user-detail.scss'

const pageClassName = 'user-detail page-shell'

export function UserDetailPage() {
  const { id } = useParams<{ id: string }>()
  const userId = parseUserId(id)

  const { data: user, isLoading, isError, error, refetch, isFetched } =
    useUserQuery(id)

  if (userId === null) {
    return <UserDetailEmpty className={pageClassName} />
  }

  if (isLoading) {
    return <UserDetailLoading className={pageClassName} />
  }

  if (isError) {
    return (
      <UserDetailError
        className={pageClassName}
        message={error?.message}
        onRetry={() => void refetch()}
      />
    )
  }

  if (isFetched && !user) {
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
