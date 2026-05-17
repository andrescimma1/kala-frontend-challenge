import {
  CloseOutlined,
  DashboardOutlined,
  LogoutOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Menu, Typography } from 'antd'
import type { MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'

const { Text } = Typography

const menuItems: MenuProps['items'] = [
  {
    key: 'users',
    icon: <TeamOutlined />,
    label: 'Users',
  },
]

interface SidebarContentProps {
  collapsed?: boolean
  showClose?: boolean
  onClose?: () => void
  onNavigate?: () => void
}

export function SidebarContent({
  collapsed = false,
  showClose = false,
  onClose,
  onNavigate,
}: SidebarContentProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const selectedKey = location.pathname.startsWith(ROUTES.users) ? 'users' : ''

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'users') {
      navigate(ROUTES.users)
      onNavigate?.()
    }
  }

  return (
    <div className="sidebar-content">
      <div className="app-sider__brand">
        <span className="app-sider__logo" aria-hidden>
          <DashboardOutlined />
        </span>
        {!collapsed && <span className="app-sider__title">AdminCore</span>}
        {showClose && (
          <Button
            type="text"
            icon={<CloseOutlined />}
            className="sidebar-content__close"
            onClick={onClose}
            aria-label="Close menu"
          />
        )}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKey ? [selectedKey] : []}
        items={menuItems}
        onClick={handleMenuClick}
        className="app-sider__menu"
      />

      <div className="app-sider__footer">
        <Avatar size={40} className="app-sider__avatar">
          AK
        </Avatar>
        {!collapsed && (
          <div className="app-sider__profile">
            <Text className="app-sider__name">Alex Kim</Text>
            <Text type="secondary" className="app-sider__role">
              Super Admin
            </Text>
          </div>
        )}
        {!collapsed && <LogoutOutlined className="app-sider__logout" />}
      </div>
    </div>
  )
}
