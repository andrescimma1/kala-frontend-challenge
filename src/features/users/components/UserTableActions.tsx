import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'

interface UserTableActionsProps {
  userId: number
}

export function UserTableActions({ userId }: UserTableActionsProps) {
  const navigate = useNavigate()

  const stopRowActivation = (event: React.MouseEvent | React.KeyboardEvent) => {
    event.stopPropagation()
  }

  return (
    <Space
      size={4}
      className="users-table__actions"
      onClick={stopRowActivation}
      onKeyDown={stopRowActivation}
    >
      <Button
        type="link"
        icon={<EyeOutlined />}
        className="users-table__action-btn"
        onClick={(event) => {
          stopRowActivation(event)
          navigate(ROUTES.userDetail(userId))
        }}
      >
        View
      </Button>
      <Button
        type="link"
        icon={<EditOutlined />}
        className="users-table__action-btn"
        onClick={(event) => {
          stopRowActivation(event)
          navigate(ROUTES.userEdit(userId))
        }}
      >
        Edit
      </Button>
    </Space>
  )
}
