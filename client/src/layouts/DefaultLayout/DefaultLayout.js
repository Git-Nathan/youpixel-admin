import classNames from 'classnames/bind'
import styles from './DefaultLayout.module.scss'

import Header from '~/components/Header'
import StudioSidebar from '~/components/Sidebar/Sidebar'
import StudioVideoNav from '~/components/StudioVideoNav'

const cn = classNames.bind(styles)

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div className={cn('container')}>
        <StudioSidebar />
        <div className={cn('content')}>
          <StudioVideoNav />
          {children}
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
