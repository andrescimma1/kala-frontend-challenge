import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button, Card, Empty, Result, Space, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'

interface UserDetailLoadingProps {
  className?: string
}

export function UserDetailLoading({ className }: UserDetailLoadingProps) {
  return (
    <Card bordered={false} className={className}>
      <div className="user-detail__state user-detail__state--loading">
        <Spin size="large" />
      </div>
    </Card>
  )
}

interface UserDetailErrorProps {
  message?: string
  onRetry: () => void
  className?: string
}

export function UserDetailError({
  message,
  onRetry,
  className,
}: UserDetailErrorProps) {
  const navigate = useNavigate()

  return (
    <Card bordered={false} className={className}>
      <Result
        status="error"
        title="Failed to load user"
        subTitle={message ?? 'Something went wrong. Please try again.'}
        extra={
          <Space wrap>
            <Button icon={<ReloadOutlined />} type="primary" onClick={onRetry}>
              Retry
            </Button>
            <Button onClick={() => navigate(ROUTES.users)}>Back to users</Button>
          </Space>
        }
      />
    </Card>
  )
}

interface UserDetailEmptyProps {
  className?: string
}

export function UserDetailEmpty({ className }: UserDetailEmptyProps) {
  const navigate = useNavigate()

  return (
    <Card bordered={false} className={className}>
      <Empty description="User not found" className="user-detail__state">
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(ROUTES.users)}
        >
          Back to users
        </Button>
      </Empty>
    </Card>
  )
}
