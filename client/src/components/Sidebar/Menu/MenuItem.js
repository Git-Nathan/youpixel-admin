import classNames from 'classnames/bind'
import { NavLink } from 'react-router-dom'
import styles from './Menu.module.scss'

const cn = classNames.bind(styles)

function MenuItem({ title, to, icon, activeIcon, unusable }) {
  if (unusable) {
    return (
      <div className={cn('menu-item')}>
        <div className={cn('wrap')}>
          <span className={cn('icon')}>{icon}</span>
          <span className={cn('active-icon')}>{activeIcon}</span>
          <span className={cn('title')}>{title}</span>
        </div>
      </div>
    )
  }

  return (
    <NavLink
      className={(nav) => cn('menu-item', { active: nav.isActive })}
      to={(nav) => (nav.isActive ? '/' : to)}
    >
      <div className={cn('wrap')}>
        <span className={cn('icon')}>{icon}</span>
        <span className={cn('active-icon')}>{activeIcon}</span>
        <span className={cn('title')}>{title}</span>
      </div>
    </NavLink>
  )
}

export default MenuItem
