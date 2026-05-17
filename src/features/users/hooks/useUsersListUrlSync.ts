import { useEffect, useLayoutEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useStore } from 'react-redux'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import type { RootState } from '@/store/store'
import { hydrateFromUrl } from '../store/usersUiSlice'
import {
  selectCurrentPage,
  selectPageSize,
  selectSearchTerm,
} from '../store/usersUiSelectors'
import {
  areUsersListSearchParamsEqual,
  areUsersListUiStatesEqual,
  buildUsersListSearchParams,
  parseUsersListSearchParams,
} from '../utils/usersListUrlParams'

export function useUsersListUrlSync() {
  const dispatch = useAppDispatch()
  const store = useStore<RootState>()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = useAppSelector(selectSearchTerm)
  const currentPage = useAppSelector(selectCurrentPage)
  const pageSize = useAppSelector(selectPageSize)
  const isSyncingToUrlRef = useRef(false)

  useLayoutEffect(() => {
    if (isSyncingToUrlRef.current) {
      isSyncingToUrlRef.current = false
      return
    }

    const fromUrl = parseUsersListSearchParams(searchParams)
    const { searchTerm: currentSearch, currentPage, pageSize } =
      store.getState().usersUi

    if (
      !areUsersListUiStatesEqual(fromUrl, {
        searchTerm: currentSearch,
        currentPage,
        pageSize,
      })
    ) {
      dispatch(hydrateFromUrl(fromUrl))
    }
  }, [dispatch, searchParams, store])

  useEffect(() => {
    const nextParams = buildUsersListSearchParams({
      searchTerm,
      currentPage,
      pageSize,
    })

    if (!areUsersListSearchParamsEqual(searchParams, nextParams)) {
      isSyncingToUrlRef.current = true
      setSearchParams(nextParams, { replace: true })
    }
    // searchParams intentionally omitted: only sync Redux → URL when UI state changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, currentPage, pageSize, setSearchParams])
}
