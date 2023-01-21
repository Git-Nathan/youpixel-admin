import classNames from 'classnames/bind'
import styles from './StudioLayout.module.scss'

import Header from '~/components/Header'
import StudioSidebar from '~/components/SideBars/StudioSidebar'
import StudioVideoNav from '~/components/StudioVideoNav'

const cn = classNames.bind(styles)

function StudioLayout({ children }) {
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

export default StudioLayout
