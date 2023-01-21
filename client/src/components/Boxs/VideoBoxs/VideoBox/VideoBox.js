import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './VideoBox.module.scss'
import Moment from 'react-moment'

const cn = classNames.bind(styles)

function VideoBox({ video }) {
  let videoDuration

  if (video.duration < 3600) {
    videoDuration = new Date(video.duration * 1000).toISOString().slice(14, 19)
  } else {
    videoDuration = new Date(video.duration * 1000).toISOString().slice(11, 19)
  }

  return (
    <div className={cn('grid__column')}>
      <div className={cn('wrapper')}>
        <div className={cn('thumbnail-box')}>
          <Link to={`/watch?v=${video._id}`} className={cn('thumbnail-link')}>
            <div
              className={cn('thumbnail')}
              style={{ backgroundImage: `url(${video?.imgUrl})` }}
            ></div>
            <div className={cn('video-duration')}>{videoDuration}</div>
          </Link>
        </div>
        <div className={cn('videobox-detail')}>
          <div className={cn('author-img-box')}>
            <Link to={`/channel/${video.userId}`}>
              <div
                referrerPolicy="no-referrer"
                className={cn('author-img')}
                style={{ backgroundImage: `url(${video.userInfo.picture})` }}
              ></div>
            </Link>
          </div>
          <div className={cn('detail')}>
            <Link to={`/watch?v=${video._id}`} className={cn('video-link')}>
              <h4 className={cn('video-name')}>{video.title}</h4>
            </Link>
            <Link to={`/channel/${video.userId}`} className={cn('author-name')}>
              {video.userInfo.name}
            </Link>
            <div className={cn('views-and-time')}>
              <span>{video.views} lượt xem</span>
              <span className={cn('timer')}>
                <Moment fromNow>{video.createdAt}</Moment>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoBox
