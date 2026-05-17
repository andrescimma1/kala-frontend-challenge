import { QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { queryClient } from '@/lib/queryClient'
import { store } from '@/store/store'
import { appTheme } from './theme'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={appTheme}>{children}</ConfigProvider>
      </QueryClientProvider>
    </Provider>
  )
}
