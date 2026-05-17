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
  const [syncedSearchTerm, setSyncedSearchTerm] = useState(searchTerm)
  const debouncedInput = useDebouncedValue(inputValue)

  if (searchTerm !== syncedSearchTerm) {
    setSyncedSearchTerm(searchTerm)
    setInputValue(searchTerm)
  }

  useEffect(() => {
    // Wait until debounce settles so URL-driven search is not cleared on load.
    if (debouncedInput !== inputValue) {
      return
    }

    if (debouncedInput !== searchTerm) {
      dispatch(setSearchTerm(debouncedInput))
    }
  }, [debouncedInput, dispatch, inputValue, searchTerm])

  return (
    <Input
      allowClear
      size="large"
      prefix={<SearchOutlined className="users-list__search-icon" />}
      placeholder="Search by name, email, company, phone or age..."
      value={inputValue}
      onChange={(event) => setInputValue(event.target.value)}
      className="users-list__search"
      aria-label="Search users"
    />
  )
}
