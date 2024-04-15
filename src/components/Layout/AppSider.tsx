import Sider from 'antd/es/layout/Sider'
import Image from 'next/image'
import {NavLink} from '../Common/Navlink'

export interface IAppSiderProps {}

export default function AppSider(props: IAppSiderProps) {
  return (
    <Sider width={240} className='!bg-background-color'>
      <div className='flex h-full w-full flex-col items-center px-5 py-5'>
        <Image src='/icons/logo.svg' alt='logo' width={150} height={27} />

        <div className='mt-10 w-full'>
          <NavLink href='/videos' className='flex h-10 w-full items-center'>
            <p className='m-0'>Videos</p>
          </NavLink>

          <NavLink href='/users' className='flex h-10 w-full items-center'>
            <p className='m-0'>Users</p>
          </NavLink>
        </div>
      </div>
    </Sider>
  )
}
