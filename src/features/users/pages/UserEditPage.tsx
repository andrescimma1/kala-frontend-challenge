import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, Space, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'
import { UserEditForm } from '../components/UserEditForm'
import {
  UserDetailEmpty,
  UserDetailError,
  UserEditLoading,
} from '../components/UserDetailStates'
import { useUserQuery } from '../hooks/useUserQuery'
import { parseUserId } from '../utils/parseUserId'
import '../styles/user-edit.scss'
import '../styles/users-list.scss'

const { Title, Text } = Typography
const pageClassName = 'user-edit page-shell'

export function UserEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const userId = parseUserId(id)

  const { data: user, isLoading, isError, error, refetch, isFetched } =
    useUserQuery(id)

  if (userId === null) {
    return (
      <UserDetailEmpty
        className={pageClassName}
        title="Invalid user"
        description="The user ID in the URL is not valid."
        backLabel="Back to users"
      />
    )
  }

  if (isLoading) {
    return <UserEditLoading className={pageClassName} />
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
    return (
      <UserDetailEmpty
        className={pageClassName}
        backLabel="Back to users"
      />
    )
  }

  if (!user) {
    return <UserEditLoading className={pageClassName} />
  }

  return (
    <Card bordered={false} className={pageClassName}>
      <Space direction="vertical" size={24} className="user-edit__content">
        <header className="user-edit__header">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            className="user-edit__back"
            onClick={() => navigate(ROUTES.userDetail(userId))}
          >
            Back to user
          </Button>
          <div className="user-edit__header-text">
            <Title level={2} className="user-edit__title">
              Edit user
            </Title>
            <Text type="secondary">
              Update information for {user.firstName} {user.lastName}
            </Text>
          </div>
        </header>

        <UserEditForm user={user} userId={userId} />
      </Space>
    </Card>
  )
}
