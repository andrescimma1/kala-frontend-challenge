import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons'
import { Avatar, Button, Space, Tag, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'
import type { User } from '../types/user'
import { getAvatarColor, getUserInitials } from '../utils/userDisplay'

const { Title, Text } = Typography

interface UserDetailHeaderProps {
  user: User
}

export function UserDetailHeader({ user }: UserDetailHeaderProps) {
  const navigate = useNavigate()
  const fullName = `${user.firstName} ${user.lastName}`

  return (
    <header className="user-detail__header">
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        className="user-detail__back"
        onClick={() => navigate(ROUTES.users)}
      >
        Back to users
      </Button>

      <div className="user-detail__hero">
        <Avatar
          size={72}
          src={user.image || undefined}
          style={{ backgroundColor: getAvatarColor(user.id) }}
          className="user-detail__avatar"
        >
          {getUserInitials(user.firstName, user.lastName)}
        </Avatar>

        <div className="user-detail__hero-text">
          <Space wrap align="center" size={8}>
            <Title level={2} className="user-detail__name">
              {fullName}
            </Title>
            <Tag color="blue" className="user-detail__role-tag">
              {user.role}
            </Tag>
          </Space>
          <Text type="secondary" className="user-detail__username">
            @{user.username}
          </Text>
        </div>

        <Button
          type="primary"
          icon={<EditOutlined />}
          className="user-detail__edit-btn"
          onClick={() => navigate(ROUTES.userEdit(user.id))}
        >
          Edit user
        </Button>
      </div>
    </header>
  )
}
