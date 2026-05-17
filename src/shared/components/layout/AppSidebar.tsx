import {
  AppstoreOutlined,
  BankOutlined,
  LogoutOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Avatar, Layout, Menu, Typography } from 'antd'
import type { MenuProps } from 'antd'
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'

const { Sider } = Layout
const { Text } = Typography

const menuItems: MenuProps['items'] = [
  {
    key: 'dashboard',
    icon: <AppstoreOutlined />,
    label: 'Dashboard',
    disabled: true,
  },
  {
    key: 'users',
    icon: <TeamOutlined />,
    label: 'Users',
  },
  {
    key: 'organizations',
    icon: <BankOutlined />,
    label: 'Organizations',
    disabled: true,
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Settings',
    disabled: true,
  },
]

interface AppSidebarProps {
  collapsed: boolean
  onCollapse: (collapsed: boolean) => void
}

export function AppSidebar({ collapsed, onCollapse }: AppSidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const selectedKey = useMemo(() => {
    if (location.pathname.startsWith(ROUTES.users)) {
      return 'users'
    }
    return 'dashboard'
  }, [location.pathname])

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'users') {
      navigate(ROUTES.users)
    }
  }

  return (
    <Sider
      className="app-sider"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      breakpoint="lg"
      width={260}
      collapsedWidth={80}
      theme="dark"
    >
      <div className="app-sider__brand">
        <span className="app-sider__logo" aria-hidden />
        {!collapsed && <span className="app-sider__title">AdminCore</span>}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
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
        <LogoutOutlined className="app-sider__logout" />
      </div>
    </Sider>
  )
}
