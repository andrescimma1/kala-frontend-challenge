import { Typography } from 'antd'
import { useParams } from 'react-router-dom'

const { Title, Paragraph } = Typography

export function UserDetailPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="page-shell">
      <Title level={2}>User details</Title>
      <Paragraph type="secondary">
        Detail view for user #{id} will be implemented in a later step.
      </Paragraph>
    </div>
  )
}
