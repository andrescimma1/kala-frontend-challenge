import { Layout } from 'antd'
import { SidebarContent } from './SidebarContent'

const { Sider } = Layout

interface AppSidebarProps {
  collapsed: boolean
  onCollapse: (collapsed: boolean) => void
}

export function AppSidebar({ collapsed, onCollapse }: AppSidebarProps) {
  return (
    <Sider
      className="app-sider app-sider--desktop"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={260}
      collapsedWidth={80}
      theme="dark"
    >
      <SidebarContent collapsed={collapsed} />
    </Sider>
  )
}
