import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons'
import {
  Alert,
  Button,
  Card,
  Empty,
  Result,
  Skeleton,
  Space,
  Typography,
} from 'antd'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'

const { Text } = Typography

interface StateCardProps {
  className?: string
  children: React.ReactNode
}

function StateCard({ className, children }: StateCardProps) {
  return (
    <Card bordered={false} className={className}>
      {children}
    </Card>
  )
}

export function UsersListLoading({ className }: { className?: string }) {
  return (
    <div className={`users-feature-state users-feature-state--list-loading ${className ?? ''}`}>
      <Skeleton active paragraph={{ rows: 1 }} title={{ width: '40%' }} />
      <Skeleton
        active
        paragraph={{ rows: 6 }}
        title={false}
        className="users-feature-state__table-skeleton"
      />
    </div>
  )
}

interface UsersListErrorProps {
  message?: string
  onRetry: () => void
  className?: string
}

export function UsersListError({
  message,
  onRetry,
  className,
}: UsersListErrorProps) {
  return (
    <Result
      status="error"
      title="Failed to load users"
      subTitle={message ?? 'Something went wrong. Please try again.'}
      extra={
        <Button type="primary" icon={<ReloadOutlined />} onClick={onRetry}>
          Retry
        </Button>
      }
      className={`users-feature-state ${className ?? ''}`}
    />
  )
}

interface UsersListEmptyProps {
  searchTerm?: string
  className?: string
}

export function UsersListEmpty({ searchTerm, className }: UsersListEmptyProps) {
  const trimmedSearch = searchTerm?.trim() ?? ''
  const hasSearch = trimmedSearch.length > 0

  return (
    <div className={`users-feature-state users-feature-state--empty ${className ?? ''}`}>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          hasSearch
            ? `No users match "${trimmedSearch}"`
            : 'No users found'
        }
      >
        {hasSearch && (
          <Text type="secondary">Try a different name, email, or company.</Text>
        )}
      </Empty>
    </div>
  )
}

export function UserDetailLoading({ className }: { className?: string }) {
  return (
    <StateCard className={className}>
      <div className="users-feature-state users-feature-state--detail-loading">
        <div className="users-feature-state__detail-header">
          <Skeleton.Avatar active size={72} shape="circle" />
          <div className="users-feature-state__detail-header-lines">
            <Skeleton active paragraph={{ rows: 1 }} title={false} />
            <Skeleton active paragraph={{ rows: 1 }} title={false} />
          </div>
        </div>
        <Skeleton active paragraph={{ rows: 4 }} title={{ width: '30%' }} />
        <Skeleton active paragraph={{ rows: 6 }} title={false} />
      </div>
    </StateCard>
  )
}

export function UserEditLoading({ className }: { className?: string }) {
  return (
    <StateCard className={className}>
      <div className="users-feature-state users-feature-state--edit-loading">
        <Skeleton active paragraph={{ rows: 1 }} title={{ width: '25%' }} />
        <Skeleton active paragraph={{ rows: 8 }} title={{ width: '20%' }} />
        <Skeleton active paragraph={{ rows: 6 }} title={{ width: '20%' }} />
      </div>
    </StateCard>
  )
}

interface UserDetailErrorProps {
  message?: string
  onRetry: () => void
  className?: string
  backLabel?: string
  onBack?: () => void
}

export function UserDetailError({
  message,
  onRetry,
  className,
  backLabel = 'Back to users',
  onBack,
}: UserDetailErrorProps) {
  const navigate = useNavigate()

  return (
    <StateCard className={className}>
      <Result
        status="error"
        title="Failed to load user"
        subTitle={message ?? 'Something went wrong. Please try again.'}
        extra={
          <Space wrap>
            <Button type="primary" icon={<ReloadOutlined />} onClick={onRetry}>
              Retry
            </Button>
            <Button
              onClick={onBack ?? (() => navigate(ROUTES.users))}
            >
              {backLabel}
            </Button>
          </Space>
        }
        className="users-feature-state"
      />
    </StateCard>
  )
}

interface UserDetailEmptyProps {
  className?: string
  title?: string
  description?: string
  backLabel?: string
  onBack?: () => void
}

export function UserDetailEmpty({
  className,
  title = 'User not found',
  description = 'The user you are looking for does not exist or may have been removed.',
  backLabel = 'Back to users',
  onBack,
}: UserDetailEmptyProps) {
  const navigate = useNavigate()

  return (
    <StateCard className={className}>
      <Empty
        className="users-feature-state"
        description={
          <Space direction="vertical" size={4}>
            <Text strong>{title}</Text>
            <Text type="secondary">{description}</Text>
          </Space>
        }
      >
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={onBack ?? (() => navigate(ROUTES.users))}
        >
          {backLabel}
        </Button>
      </Empty>
    </StateCard>
  )
}

interface UserEditSavingAlertProps {
  visible: boolean
}

export function UserEditSavingAlert({ visible }: UserEditSavingAlertProps) {
  if (!visible) {
    return null
  }

  return (
    <Alert
      type="info"
      showIcon
      message="Saving changes..."
      className="users-feature-state__saving-alert"
    />
  )
}
