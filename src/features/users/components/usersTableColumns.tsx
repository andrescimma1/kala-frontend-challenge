import { Avatar, Typography } from 'antd'
import type { TableColumnsType } from 'antd'
import type { User } from '../types/user'
import {
  formatRowIndex,
  getAvatarColor,
  getUserInitials,
} from '../utils/userDisplay'
import { UserTableActions } from './UserTableActions'

const { Text } = Typography

export function createUsersTableColumns(skip: number): TableColumnsType<User> {
  return [
    {
      title: '#',
      key: 'index',
      width: 56,
      render: (_value, _record, index) => (
        <Text type="secondary" className="users-table__index">
          {formatRowIndex(index, skip)}
        </Text>
      ),
    },
    {
      title: 'FULL NAME',
      key: 'fullName',
      width: 240,
      render: (_, user) => (
        <div className="users-table__name-cell">
          <Avatar
            size={40}
            style={{ backgroundColor: getAvatarColor(user.id) }}
            className="users-table__avatar"
          >
            {getUserInitials(user.firstName, user.lastName)}
          </Avatar>
          <div className="users-table__name-meta">
            <Text strong className="users-table__full-name">
              {user.firstName} {user.lastName}
            </Text>
            <Text type="secondary" className="users-table__username">
              @{user.username}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: 'PHONE',
      dataIndex: 'phone',
      key: 'phone',
      responsive: ['md'],
    },
    {
      title: 'AGE',
      dataIndex: 'age',
      key: 'age',
      width: 72,
      responsive: ['lg'],
    },
    {
      title: 'COMPANY',
      key: 'company',
      ellipsis: true,
      responsive: ['md'],
      render: (_, user) => user.company.name,
    },
    {
      title: 'ACTION',
      key: 'action',
      width: 160,
      fixed: 'right',
      render: (_, user) => <UserTableActions userId={user.id} />,
    },
  ]
}
