import { Drawer, Grid, Layout } from 'antd'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AppHeader } from './AppHeader'
import { AppSidebar } from './AppSidebar'
import { SidebarContent } from './SidebarContent'

const { Content } = Layout
const { useBreakpoint } = Grid

export function MainLayout() {
  const screens = useBreakpoint()
  const isMobile = !screens.lg
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <Layout className="app-layout">
      {!isMobile && (
        <AppSidebar collapsed={collapsed} onCollapse={setCollapsed} />
      )}

      <Layout className="app-layout__main">
        <AppHeader
          showMenuButton={isMobile}
          onMenuOpen={() => setMobileMenuOpen(true)}
        />
        <Content className="app-layout__content">
          <Outlet />
        </Content>
      </Layout>

      <Drawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        placement="left"
        width="100%"
        className="app-drawer"
        closable={false}
        styles={{
          body: { padding: 0, background: '#001529' },
          header: { display: 'none' },
        }}
      >
        <SidebarContent
          showClose
          onClose={() => setMobileMenuOpen(false)}
          onNavigate={() => setMobileMenuOpen(false)}
        />
      </Drawer>
    </Layout>
  )
}
