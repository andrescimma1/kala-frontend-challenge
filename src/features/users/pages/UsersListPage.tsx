import { Card, Space } from 'antd'
import { useUsersQuery } from '../hooks/useUsersQuery'
import { UsersListHeader } from '../components/UsersListHeader'
import { UsersSearchInput } from '../components/UsersSearchInput'
import { UsersTable } from '../components/UsersTable'
import {
  UsersListEmpty,
  UsersListError,
  UsersListLoading,
} from '../components/UserPageStates'
import { setCurrentPage } from '../store/usersUiSlice'
import {
  selectCurrentPage,
  selectPageSize,
  selectSearchTerm,
} from '../store/usersUiSelectors'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import '../styles/user-states.scss'
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
  const isInitialLoading = isLoading && data === undefined
  const isEmpty = !isInitialLoading && !isError && users.length === 0

  const renderTableSection = () => {
    if (isInitialLoading) {
      return <UsersListLoading />
    }

    if (isError) {
      return (
        <UsersListError
          message={error?.message}
          onRetry={() => void refetch()}
        />
      )
    }

    if (isEmpty) {
      return <UsersListEmpty searchTerm={searchTerm} />
    }

    return (
      <UsersTable
        users={users}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        skip={skip}
        isLoading={isFetching}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
      />
    )
  }

  return (
    <Card bordered={false} className="users-list page-shell">
      <Space direction="vertical" size={24} className="users-list__content">
        <UsersListHeader total={isInitialLoading ? 0 : total} />
        <UsersSearchInput />
        {renderTableSection()}
      </Space>
    </Card>
  )
}
