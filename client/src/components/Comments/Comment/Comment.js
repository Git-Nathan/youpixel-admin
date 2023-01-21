import styles from './Comment.module.scss'
import classNames from 'classnames/bind'
import { useState } from 'react'
import { reportComment } from '~/api/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { DeleteIcon, FeedbackIcon } from '~/components/icons'
import { useDispatch } from 'react-redux'
import { deleteComment } from '~/actions/commentActions'
import ConfirmOverlay from '~/components/ConfirmOverlay'
import Moment from 'react-moment'

const cn = classNames.bind(styles)

function Comment({
  comment,
  currentUser,
  notify,
  notify2,
  videoId,
  comments,
  setComments,
  setNumOfComments,
}) {
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const dispatch = useDispatch()
  const [reportMessage, setReportMessage] = useState('')

  const handleDelete = () => {
    dispatch(deleteComment(comment._id, notify))
    setComments(comments.filter((item) => item._id !== comment._id))
    setNumOfComments((prev) => --prev)
  }

  const handleReport = () => {
    reportComment(comment._id, {
      videoId,
      reportMessage,
      userId: comment.userInfo._id,
    })
    notify2()
  }

  return (
    <>
      <div className={cn('wrappper')}>
        <div className={cn('left')}>
          <img
            className={cn('user-img')}
            src={comment.userInfo.picture}
            alt="UserImg"
          />
          <div className={cn('detail-wrap')}>
            <div className={cn('detail-top')}>
              <div className={cn('user-name')}>{comment.userInfo.name}</div>
              <div className={cn('moment')}>
                <Moment fromNow>{comment.createdAt}</Moment>
              </div>
            </div>
            <div className={cn('comment')}>{comment.desc}</div>
          </div>
        </div>
        <div>
          <button
            className={cn('menu-btn', 'deletable')}
            onClick={() => {
              setOpen(true)
            }}
          >
            <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
          </button>

          {open && (
            <>
              <div className={cn('menu-wrapper')}>
                {(currentUser.result.role === 'admin' ||
                  currentUser.result._id === comment.userId) && (
                  <button
                    className={cn('menu-item')}
                    onClick={() => {
                      setOpen(false)
                      setOpen2(true)
                    }}
                  >
                    <DeleteIcon />
                    <span className={cn('menu-text')}>Xóa</span>
                  </button>
                )}

                {currentUser.result._id !== comment.userId && (
                  <button
                    className={cn('menu-item')}
                    onClick={() => {
                      setOpen(false)
                      setOpen3(true)
                    }}
                  >
                    <FeedbackIcon />
                    <span className={cn('menu-text')}>Báo vi phạm</span>
                  </button>
                )}
              </div>
              <div
                className={cn('overlay')}
                onClick={() => {
                  setOpen(false)
                }}
              ></div>
            </>
          )}
          {open2 && (
            <ConfirmOverlay
              setOpen={setOpen2}
              title="Bạn có chắc muốn xóa bình luận?"
              confirmText="Xóa"
              onConfirm={handleDelete}
            />
          )}
          {open3 && (
            <ConfirmOverlay
              setOpen={setOpen3}
              title="Bạn có chắc muốn báo vi phạm bình luận?"
              confirmText="Báo vi phạm"
              onConfirm={handleReport}
              setMessage={setReportMessage}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Comment
