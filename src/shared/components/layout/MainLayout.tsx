import { Layout } from 'antd'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AppHeader } from './AppHeader'
import { AppSidebar } from './AppSidebar'

const { Content } = Layout

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className="app-layout">
      <AppSidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout className="app-layout__main">
        <AppHeader />
        <Content className="app-layout__content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
