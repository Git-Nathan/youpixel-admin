import styles from './ReportedCommentBox.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

const cn = classNames.bind(styles)

function ReportedCommentBox({ item }) {
  let videoDuration
  if (item.videoInfo.duration < 3600) {
    videoDuration = new Date(item.videoInfo.duration * 1000)
      .toISOString()
      .slice(14, 19)
  } else {
    videoDuration = new Date(item.videoInfo.duration * 1000)
      .toISOString()
      .slice(11, 19)
  }

  return (
    <tr className={cn('row')}>
      <td className={cn('video-col')} style={{ padding: '0 0 0 12px' }}>
        <div style={{ display: 'flex' }}>
          <Link
            className={cn('video-link')}
            to={`/watch?v=${item.videoInfo._id}`}
          >
            <img
              className={cn('video-img')}
              src={item.videoInfo.imgUrl}
              alt="video img"
            />
            <div className={cn('video-duration')}>{videoDuration}</div>
          </Link>
          <div className={cn('video-col-end')}>
            <Link
              className={cn('title-link')}
              to={`/watch?v=${item.videoInfo._id}`}
            >
              <div className={cn('video-name')}>{item.videoInfo.title}</div>
            </Link>
            <div className={cn('video-desc')}>{item.videoInfo.desc}</div>
          </div>
        </div>
      </td>
      <td>
        <div style={{ display: 'flex' }}>
          {item.userInfo.picture ? (
            <Link
              to={`/channel/${item.userInfo._id}`}
              className={cn('channel-link')}
            >
              <img
                className={cn('channel-picture')}
                src={item.userInfo.picture}
                alt="ChannelPicture"
              />
            </Link>
          ) : (
            <div className={cn('channel-picture')}></div>
          )}

          <div className={cn('channel-text')}>
            <Link
              to={`/channel/${item.userInfo._id}`}
              className={cn('channel-name')}
            >
              {item.userInfo.name}
            </Link>
            <div className={cn('channel-sub')}>
              {item.userInfo.numberOfSubcribers} người đăng ký
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className={cn('text-col')}> {item.commentInfo.desc}</div>
      </td>
      <td>
        <div style={{ display: 'flex' }}>
          {item.reportUserInfo.picture ? (
            <Link
              to={`/channel/${item.reportUserInfo._id}`}
              className={cn('channel-link')}
            >
              <img
                className={cn('channel-picture')}
                src={item.reportUserInfo.picture}
                alt="ChannelPicture"
              />
            </Link>
          ) : (
            <div className={cn('channel-picture')}></div>
          )}

          <div className={cn('channel-text')}>
            <Link
              to={`/channel/${item.reportUserInfo._id}`}
              className={cn('channel-name')}
            >
              {item.reportUserInfo.name}
            </Link>
            <div className={cn('channel-sub')}>
              {item.reportUserInfo.numberOfSubcribers} người đăng ký
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className={cn('text-col')}> {item.reportContent}</div>
      </td>
    </tr>
  )
}

export default ReportedCommentBox
