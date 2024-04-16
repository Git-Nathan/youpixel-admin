import {Dropdown, MenuProps} from 'antd'
import {Header} from 'antd/es/layout/layout'
import Image from 'next/image'
import {useRouter} from 'next/navigation'

const items: MenuProps['items'] = [
  {
    key: 'logout',
    danger: true,
    label: 'Logout',
  },
]

export default function AppHeader() {
  const router = useRouter()

  const onClick: MenuProps['onClick'] = ({key}) => {
    switch (key) {
      case 'logout': {
        localStorage.clear()
        router.replace('/auth')
      }
    }
  }

  return (
    <Header className='border-bg-card flex items-center justify-end border-b border-solid !bg-background-color !px-5'>
      <Dropdown menu={{items, onClick}} placement='bottomRight'>
        <div className='flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-dashed border-primary-color'>
          <div className='flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#dadada]'>
            <Image width={24} height={24} src='/images/user.webp' alt='user' />
          </div>
        </div>
      </Dropdown>
    </Header>
  )
}
