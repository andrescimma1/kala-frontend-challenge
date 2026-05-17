import { Pagination, Table } from 'antd'
import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'
import type { User } from '../types/user'
import { formatShowingRange } from '../utils/userDisplay'
import { createUsersTableColumns } from './usersTableColumns'

interface UsersTableProps {
  users: User[]
  total: number
  currentPage: number
  pageSize: number
  skip: number
  isLoading?: boolean
  onPageChange: (page: number) => void
}

export function UsersTable({
  users,
  total,
  currentPage,
  pageSize,
  skip,
  isLoading = false,
  onPageChange,
}: UsersTableProps) {
  const navigate = useNavigate()

  const columns = useMemo(
    () => createUsersTableColumns(skip),
    [skip],
  )

  const navigateToUser = useCallback(
    (user: User) => {
      if (isLoading) {
        return
      }
      navigate(ROUTES.userDetail(user.id))
    },
    [isLoading, navigate],
  )

  return (
    <div className="users-table">
      <div className="users-table__scroll">
        <Table<User>
          rowKey="id"
          columns={columns}
          dataSource={users}
          loading={isLoading}
          pagination={false}
          className="users-table__table"
          rowClassName={() => 'users-table__row'}
          onRow={(user) => ({
            onClick: () => navigateToUser(user),
            onKeyDown: (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                navigateToUser(user)
              }
            },
            tabIndex: 0,
            role: 'button',
            'aria-label': `View ${user.firstName} ${user.lastName}`,
          })}
        />
      </div>

      {total > 0 && (
        <footer className="users-table__footer">
          <span className="users-table__range">
            {formatShowingRange(currentPage, pageSize, total)}
          </span>
          <div className="users-table__pagination-wrap">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={total}
              onChange={onPageChange}
              showSizeChanger={false}
              responsive
              className="users-table__pagination"
            />
          </div>
        </footer>
      )}
    </div>
  )
}
