import AntdProvider from '@/providers/AntdProvider'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import {AntdRegistry} from '@ant-design/nextjs-registry'
import clsx from 'clsx'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.scss'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en'>
      <body className={clsx(inter.className, 'text-white bg-background-color')}>
        <AntdRegistry>
          <AntdProvider>
            <ReactQueryProvider>
              {children}
              <ToastContainer
                position='top-center'
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
              />
            </ReactQueryProvider>
          </AntdProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
