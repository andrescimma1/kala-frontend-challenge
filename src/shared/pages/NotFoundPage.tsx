import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'
import '../styles/route-pages.scss'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Card bordered={false} className="route-page page-shell">
      <Result
        status="404"
        title="Page not found"
        subTitle="The page you are looking for does not exist or may have been moved."
        extra={
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(ROUTES.users)}
          >
            Back to users
          </Button>
        }
        className="route-page__result"
      />
    </Card>
  )
}
