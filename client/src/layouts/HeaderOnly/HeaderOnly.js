import classNames from 'classnames/bind'
import styles from './HeaderOnly.module.scss'

import Header from '~/components/Header'

const cn = classNames.bind(styles)

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div className={cn('container')}>
        <div className={cn('content')}>{children}</div>
      </div>
    </div>
  )
}

export default DefaultLayout
