import { Card, Space } from 'antd'
import { useUsersQuery } from '../hooks/useUsersQuery'
import { UsersListHeader } from '../components/UsersListHeader'
import { UsersSearchInput } from '../components/UsersSearchInput'
import { UsersTable } from '../components/UsersTable'
import { setCurrentPage } from '../store/usersUiSlice'
import {
  selectCurrentPage,
  selectPageSize,
  selectSearchTerm,
} from '../store/usersUiSelectors'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import '../styles/users-list.scss'

export function UsersListPage() {
  const dispatch = useAppDispatch()
  const searchTerm = useAppSelector(selectSearchTerm)
  const currentPage = useAppSelector(selectCurrentPage)
  const pageSize = useAppSelector(selectPageSize)
  const skip = (currentPage - 1) * pageSize

  const { data, isLoading, isError, error, refetch, isFetching } =
    useUsersQuery({
      searchTerm,
      limit: pageSize,
      skip,
    })

  const users = data?.users ?? []
  const total = data?.total ?? 0

  return (
    <Card bordered={false} className="users-list page-shell">
      <Space direction="vertical" size={24} className="users-list__content">
        <UsersListHeader total={total} />
        <UsersSearchInput />
        <UsersTable
          users={users}
          total={total}
          currentPage={currentPage}
          pageSize={pageSize}
          skip={skip}
          isLoading={isLoading || isFetching}
          isError={isError}
          errorMessage={error?.message}
          onPageChange={(page) => dispatch(setCurrentPage(page))}
          onRetry={() => void refetch()}
        />
      </Space>
    </Card>
  )
}
