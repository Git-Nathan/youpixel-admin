import styles from './StudioVideoNav.module.scss'
import classNames from 'classnames/bind'
import { NavLink } from 'react-router-dom'

const cn = classNames.bind(styles)

function StudioVideoNav() {
  return (
    <div className={cn('wrapper')}>
      <h2 className={cn('title')} style={{ marginLeft: '8px' }}>
        Nội dung của kênh
      </h2>
      <div className={cn('nav-box')}>
        <NavLink
          to={'/admin/approval'}
          className={(nav) => cn('menu-item', { active: nav.isActive })}
          end
        >
          <div className={cn('nav-link-btn')}>Duyệt video</div>
        </NavLink>
        <NavLink
          to={'/admin/reported'}
          className={(nav) => cn('menu-item', { active: nav.isActive })}
          end
        >
          <div className={cn('nav-link-btn')}>Bình luận vi phạm</div>
        </NavLink>
        <NavLink
          to={'/admin/trash'}
          className={(nav) => cn('menu-item', { active: nav.isActive })}
          end
        >
          <div className={cn('nav-link-btn')}>Video rác</div>
        </NavLink>
      </div>
    </div>
  )
}

export default StudioVideoNav
