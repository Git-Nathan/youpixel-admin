import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './UserMenuItem.module.scss'

const cn = classNames.bind(styles)

function MenuItem({ title, to, icon }) {
  return (
    <Link className={cn('menu-item')} to={to}>
      <div className={cn('wrap')}>
        <span className={cn('icon')}>{icon}</span>
        <span className={cn('title')}>{title}</span>
      </div>
    </Link>
  )
}

export default MenuItem
