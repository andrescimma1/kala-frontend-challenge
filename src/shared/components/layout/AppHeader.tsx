import {
  BellOutlined,
  DownOutlined,
  MenuOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Dropdown,
  Layout,
  Space,
  Typography,
} from 'antd'
import type { MenuProps } from 'antd'
import { useMemo } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { getUsersBreadcrumbDefs } from '@/shared/navigation/usersBreadcrumbs'

const { Header } = Layout
const { Text } = Typography

const profileMenuItems: MenuProps['items'] = [
  { key: 'profile', label: 'Profile', disabled: true },
  { key: 'settings', label: 'Settings', disabled: true },
  { type: 'divider' },
  { key: 'logout', label: 'Log out', disabled: true },
]

interface AppHeaderProps {
  showMenuButton?: boolean
  onMenuOpen?: () => void
}

export function AppHeader({ showMenuButton, onMenuOpen }: AppHeaderProps) {
  const location = useLocation()
  const { id } = useParams<{ id: string }>()

  const breadcrumbItems = useMemo(() => {
    return getUsersBreadcrumbDefs(location.pathname, id).map((item) => {
      if (item.type === 'link') {
        return { title: <Link to={item.to}>{item.label}</Link> }
      }
      return { title: item.label }
    })
  }, [id, location.pathname])

  return (
    <Header className="app-header">
      <div className="app-header__start">
        {showMenuButton && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            className="app-header__menu-btn"
            onClick={onMenuOpen}
            aria-label="Open menu"
          />
        )}
        <Breadcrumb items={breadcrumbItems} className="app-header__breadcrumb" />
      </div>

      <Space size="large" className="app-header__actions">
        <Badge dot>
          <BellOutlined className="app-header__icon" />
        </Badge>

        <Dropdown menu={{ items: profileMenuItems }} trigger={['click']}>
          <button type="button" className="app-header__profile">
            <Avatar size={40} className="app-header__avatar">
              AK
            </Avatar>
            <Text className="app-header__name">Alex Kim</Text>
            <DownOutlined className="app-header__chevron" />
          </button>
        </Dropdown>
      </Space>
    </Header>
  )
}
