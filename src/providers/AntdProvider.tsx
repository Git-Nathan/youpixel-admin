'use client'

import {ConfigProvider, theme} from 'antd'
import {ReactNode} from 'react'

export interface IAntdProviderProps {
  children: ReactNode
}

export default function AntdProvider(props: IAntdProviderProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#F05123',
          borderRadius: 6,
        },
        algorithm: theme.darkAlgorithm,
      }}
    >
      {props.children}
    </ConfigProvider>
  )
}
