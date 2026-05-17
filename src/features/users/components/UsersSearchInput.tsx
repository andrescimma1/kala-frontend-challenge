import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useEffect, useState } from 'react'
import { setSearchTerm } from '../store/usersUiSlice'
import { selectSearchTerm } from '../store/usersUiSelectors'
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

export function UsersSearchInput() {
  const dispatch = useAppDispatch()
  const searchTerm = useAppSelector(selectSearchTerm)
  const [inputValue, setInputValue] = useState(searchTerm)
  const debouncedInput = useDebouncedValue(inputValue)

  useEffect(() => {
    if (debouncedInput !== searchTerm) {
      dispatch(setSearchTerm(debouncedInput))
    }
  }, [debouncedInput, dispatch, searchTerm])

  useEffect(() => {
    setInputValue(searchTerm)
  }, [searchTerm])

  return (
    <Input
      allowClear
      size="large"
      prefix={<SearchOutlined className="users-list__search-icon" />}
      placeholder="Search by name, email or company..."
      value={inputValue}
      onChange={(event) => setInputValue(event.target.value)}
      className="users-list__search"
      aria-label="Search users"
    />
  )
}
