import Sider from 'antd/es/layout/Sider'

export interface IAppSiderProps {}

export default function AppSider(props: IAppSiderProps) {
  return (
    <Sider width={240}>
      <p className='text-primary-color'>Sider</p>
    </Sider>
  )
}
