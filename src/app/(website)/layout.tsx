'use client'

import AppSider from '@/components/Layout/AppSider'
import {Layout} from 'antd'
import {Footer, Header} from 'antd/es/layout/layout'
import {redirect} from 'next/navigation'
import {ReactNode, useLayoutEffect, useState} from 'react'
import {SplashScreen} from '../loading'

export interface IAuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout(props: IAuthLayoutProps) {
  const [loading, setLoading] = useState(true)

  useLayoutEffect(() => {
    const token = localStorage?.getItem('token')

    if (!token) {
      redirect('/auth')
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <SplashScreen />
  }

  return (
    <Layout>
      <AppSider />
      <Layout>
        <Header>Header</Header>
        {props.children}
        <Footer className='text-center'>Youpixel Admin - by Nathan Ngo</Footer>
      </Layout>
    </Layout>
  )
}
