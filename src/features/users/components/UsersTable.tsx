import { ReloadOutlined } from '@ant-design/icons'
import { Button, Empty, Pagination, Result, Table } from 'antd'
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
  isLoading: boolean
  isError: boolean
  errorMessage?: string
  onPageChange: (page: number) => void
  onRetry: () => void
}

export function UsersTable({
  users,
  total,
  currentPage,
  pageSize,
  skip,
  isLoading,
  isError,
  errorMessage,
  onPageChange,
  onRetry,
}: UsersTableProps) {
  const columns = useMemo(
    () => createUsersTableColumns(skip),
    [skip],
  )

  if (isError) {
    return (
      <Result
        status="error"
        title="Failed to load users"
        subTitle={errorMessage ?? 'Something went wrong. Please try again.'}
        extra={
          <Button type="primary" icon={<ReloadOutlined />} onClick={onRetry}>
            Retry
          </Button>
        }
        className="users-table__error"
      />
    )
  }

  const isEmpty = !isLoading && users.length === 0

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
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={isEmpty ? 'No users found' : 'No data'}
                className="users-table__empty"
              />
            ),
          }}
        />
      </div>

      {!isEmpty && total > 0 && (
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
