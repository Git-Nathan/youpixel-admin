import {Menu, MenuProps} from 'antd'
import Sider from 'antd/es/layout/Sider'
import {ItemType, MenuItemType} from 'antd/es/menu/hooks/useItems'
import Image from 'next/image'
import {usePathname, useRouter} from 'next/navigation'
import {ReactSVG} from 'react-svg'

const navItem: ItemType<MenuItemType>[] = [
  {
    key: '/videos',
    label: 'Videos',
    icon: <ReactSVG src='/icons/library.svg' />,
  },
  {
    key: '/users',
    label: 'Users',
    icon: <ReactSVG src='/icons/user-octagon.svg' />,
  },
]

export interface IAppSiderProps {}

export default function AppSider(props: IAppSiderProps) {
  const router = useRouter()
  const pathname = usePathname()

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key)
  }

  return (
    <Sider
      width={240}
      className='border-r border-solid border-bg-card !bg-background-color'
    >
      <div className='flex h-full w-full flex-col items-center px-2 py-5'>
        <Image src='/icons/logo.svg' alt='logo' width={150} height={27} />

        <div className='mt-10 w-full'>
          <Menu
            onClick={onClick}
            defaultSelectedKeys={[
              navItem.find((item) => pathname.indexOf(item?.key as string) > -1)
                ?.key as string,
            ]}
            mode='inline'
            items={navItem}
          />
        </div>
      </div>
    </Sider>
  )
}
