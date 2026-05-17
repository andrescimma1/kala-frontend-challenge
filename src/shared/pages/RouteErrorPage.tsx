import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button, Card, Result, Space } from 'antd'
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'
import '../styles/route-pages.scss'

function getErrorMessage(error: unknown): string {
  if (isRouteErrorResponse(error)) {
    if (typeof error.data === 'string') {
      return error.data
    }
    if (
      error.data &&
      typeof error.data === 'object' &&
      'message' in error.data &&
      typeof error.data.message === 'string'
    ) {
      return error.data.message
    }
    return error.statusText || 'Something went wrong while loading this page.'
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Something went wrong while loading this page.'
}

export function RouteErrorPage() {
  const error = useRouteError()
  const navigate = useNavigate()
  const message = getErrorMessage(error)

  return (
    <Card bordered={false} className="route-page page-shell">
      <Result
        status="error"
        title="Something went wrong"
        subTitle={message}
        extra={
          <Space wrap>
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={() => window.location.reload()}
            >
              Try again
            </Button>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(ROUTES.users)}
            >
              Back to users
            </Button>
          </Space>
        }
        className="route-page__result"
      />
    </Card>
  )
}
