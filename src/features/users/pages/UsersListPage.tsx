import { Typography } from 'antd'

const { Title, Paragraph } = Typography

export function UsersListPage() {
  return (
    <div className="page-shell">
      <header className="page-shell__header">
        <Title level={2} className="page-shell__title">
          Users
        </Title>
        <Paragraph type="secondary" className="page-shell__subtitle">
          Manage and monitor all registered users
        </Paragraph>
      </header>
      <Paragraph type="secondary">
        Users table and search will be implemented in the next step.
      </Paragraph>
    </div>
  )
}
