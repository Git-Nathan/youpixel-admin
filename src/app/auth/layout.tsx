'use client'

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

    if (token) {
      redirect('/videos')
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <SplashScreen />
  }

  return props.children
}
