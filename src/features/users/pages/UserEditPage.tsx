import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, Space, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'
import { UserEditForm } from '../components/UserEditForm'
import {
  UserDetailEmpty,
  UserDetailError,
  UserDetailLoading,
} from '../components/UserDetailStates'
import { useUserQuery } from '../hooks/useUserQuery'
import { parseUserId } from '../utils/parseUserId'
import '../styles/user-edit.scss'

const { Title, Text } = Typography
const pageClassName = 'user-edit page-shell'

export function UserEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
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
