'use client'

import {ReactNode} from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

export interface IReactQueryProviderProps {
  children: ReactNode
}

export default function ReactQueryProvider(props: IReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  )
}
