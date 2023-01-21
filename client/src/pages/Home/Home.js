import styles from './Home.module.scss'
import classNames from 'classnames/bind'
import VideoBoxs from '~/components/Boxs/VideoBoxs'
import FilterBar from '~/components/FilterBar'

const cn = classNames.bind(styles)

function Home() {
  return (
    <div className={cn('grid')}>
      <div className={cn('filter-bar')}>
        <FilterBar />
      </div>
      <div className={cn('margin')}></div>
      <VideoBoxs />
    </div>
  )
}

export default Home
