import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar'
import logo from '~/assets/images/logo.png'
import { SidebarIcon } from '../icons'
import 'react-toastify/dist/ReactToastify.css'

const cn = classNames.bind(styles)

function Header() {
  return (
    <>
      <header className={cn('wrapper')}>
        <div className={cn('inner')}>
          <div className={cn('start')}>
            <div className={cn('sidebar-btn')}>
              <SidebarIcon height="25px" />
            </div>
            <Link to="/admin/approval" className={cn('logo-link')}>
              <img className={cn('logo-img')} src={logo} alt="logo" />
            </Link>
            <SearchBar />
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
