import { BellOutlined, DownOutlined } from '@ant-design/icons'
import { Avatar, Badge, Breadcrumb, Dropdown, Layout, Space, Typography } from 'antd'
import type { MenuProps } from 'antd'
import { useMemo, type ReactNode } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'

const { Header } = Layout
const { Text } = Typography

const profileMenuItems: MenuProps['items'] = [
  { key: 'profile', label: 'Profile', disabled: true },
  { key: 'settings', label: 'Settings', disabled: true },
  { type: 'divider' },
  { key: 'logout', label: 'Log out', disabled: true },
]

export function AppHeader() {
  const location = useLocation()
  const { id } = useParams<{ id: string }>()

  const breadcrumbItems = useMemo(() => {
    const items: { title: ReactNode }[] = [
      {
        title: <Link to={ROUTES.users}>Dashboard</Link>,
      },
    ]

    if (location.pathname === ROUTES.users) {
      items.push({ title: 'Users' })
      return items
    }

    if (location.pathname.startsWith('/users/')) {
      items.push({
        title: <Link to={ROUTES.users}>Users</Link>,
      })

      if (location.pathname.endsWith('/edit') && id) {
        items.push({
          title: <Link to={ROUTES.userDetail(id)}>User #{id}</Link>,
        })
        items.push({ title: 'Edit' })
      } else if (id) {
        items.push({ title: `User #${id}` })
      }
    }

    return items
  }, [id, location.pathname])

  return (
    <Header className="app-header">
      <Breadcrumb items={breadcrumbItems} className="app-header__breadcrumb" />

      <Space size="large" className="app-header__actions">
        <Badge dot>
          <BellOutlined className="app-header__icon" />
        </Badge>

        <Dropdown menu={{ items: profileMenuItems }} trigger={['click']}>
          <button type="button" className="app-header__profile">
            <Avatar size={32} className="app-header__avatar">
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
