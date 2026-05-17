import { Typography } from 'antd'

const { Title, Paragraph } = Typography

interface UsersListHeaderProps {
  total: number
}

export function UsersListHeader({ total }: UsersListHeaderProps) {
  return (
    <header className="users-list__header">
      <div className="users-list__header-text">
        <Title level={2} className="users-list__title">
          Users
        </Title>
        <Paragraph type="secondary" className="users-list__subtitle">
          Manage and monitor all registered users
        </Paragraph>
      </div>
      <span className="users-list__total-badge">{total} total</span>
    </header>
  )
}
