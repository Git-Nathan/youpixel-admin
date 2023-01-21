import classNames from 'classnames/bind'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import styles from './SearchVideoBox.module.scss'

const cn = classNames.bind(styles)

function SearchVideoBox({ video }) {
  let videoDuration

  if (video.duration < 3600) {
    videoDuration = new Date(video.duration * 1000).toISOString().slice(14, 19)
  } else {
    videoDuration = new Date(video.duration * 1000).toISOString().slice(11, 19)
  }

  return (
    <div className={cn('wrapper')}>
      <Link to={`/watch?v=${video._id}`} className={cn('img-link')}>
        <>
          <div
            className={cn('thumbnail')}
            style={{ backgroundImage: `url(${video?.imgUrl})` }}
          ></div>
          <div className={cn('video-duration')}>{videoDuration}</div>
        </>
      </Link>
      <div className={cn('video-details')}>
        <Link to={`/watch?v=${video._id}`} className={cn('title-link')}>
          <div className={cn('video-name')}>{video.title}</div>
          <div className={cn('views-and-time')}>
            <span>{video.views} lượt xem</span>
            <span className={cn('timer')}>
              <Moment fromNow>{video.createdAt}</Moment>
            </span>
          </div>
        </Link>
        <Link to={`/channel/${video.userInfo._id}`} className={cn('author')}>
          <img
            className={cn('author-img')}
            src={video.userInfo.picture}
            alt="author"
          />
          <div className={cn('author-name')}>{video.userInfo.name}</div>
        </Link>
        <div className={cn('video-desc')}>{video.desc}</div>
      </div>
    </div>
  )
}

export default SearchVideoBox
