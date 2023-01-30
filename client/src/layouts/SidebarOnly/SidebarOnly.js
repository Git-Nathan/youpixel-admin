import classNames from 'classnames/bind'
import styles from './SidebarOnly.module.scss'

import Header from '~/components/Header'
import StudioSidebar from '~/components/Sidebar/Sidebar'

const cn = classNames.bind(styles)

function SidebarOnly({ children }) {
  return (
    <div>
      <Header />
      <div className={cn('container')}>
        <StudioSidebar />
        <div className={cn('content')}>{children}</div>
      </div>
    </div>
  )
}

export default SidebarOnly
