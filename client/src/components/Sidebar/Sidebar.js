import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import { MenuItem } from './Menu'
import { HomeIcon, HomeIconActive } from '../icons'
import unName from '~/assets/images/unnamed.jpg'

const cn = classNames.bind(styles)

function StudioSidebar() {
  return (
    <aside className={cn('wrapper')}>
      <div className={cn('start')}>
        <img className={cn('user-img')} src={unName} alt="user img" />
        <div className={cn('user-title')}>Quản lý videos</div>
        <div className={cn('user-name')}>ADMIN</div>
      </div>
      <div className={cn('center')}>
        <nav className={cn('nav-wrap')}>
          <div
            className={cn('nav-box')}
            style={{ borderTop: 'none', marginTop: '0', paddingTop: '0' }}
          >
            <MenuItem
              to={'/admin'}
              title="Nội dung"
              icon={<HomeIcon />}
              activeIcon={<HomeIconActive />}
            ></MenuItem>
          </div>
        </nav>
      </div>
    </aside>
  )
}

export default StudioSidebar
