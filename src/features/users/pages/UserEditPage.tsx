import { Typography } from 'antd'
import { useParams } from 'react-router-dom'

const { Title, Paragraph } = Typography

export function UserEditPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="page-shell">
      <Title level={2}>Edit user</Title>
      <Paragraph type="secondary">
        Edit form for user #{id} will be implemented in a later step.
      </Paragraph>
    </div>
  )
}
