import { Pagination, Table } from 'antd'
import { useMemo } from 'react'
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
  const columns = useMemo(
    () => createUsersTableColumns(skip),
    [skip],
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
