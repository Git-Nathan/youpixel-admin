import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './SubcribeButton.module.scss'
import { useState } from 'react'
import ConfirmOverlay from '~/components/ConfirmOverlay'
import { useDispatch } from 'react-redux'
import { sub, unsub } from '~/actions/authActions'
import { toast } from 'react-toastify'

const cn = classNames.bind(styles)

function SubcribeButton({ currentUser, setCurrentUser, channel, setChannel }) {
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  const notify = () =>
    toast.success('Đã xóa đăng ký.', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })

  const notify2 = () =>
    toast.success('Đã đăng ký kênh.', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })

  const handleSub = async () => {
    if (currentUser?.result.subscribedUsers.includes(channel._id)) {
      let archive = structuredClone(currentUser)
      archive.result.subscribedUsers.splice(
        archive.result.subscribedUsers.findIndex(
          (item) => item === channel._id,
        ),
      )
      setCurrentUser(archive)
      setChannel({ ...channel, subscribers: channel.subscribers - 1 })
      dispatch(unsub(channel._id, setCurrentUser, notify))
    } else {
      setCurrentUser({
        ...currentUser,
        result: { ...currentUser.result, subscribedUsers: channel._id },
      })
      setChannel({ ...channel, subscribers: channel.subscribers + 1 })
      dispatch(sub(channel._id, setCurrentUser, notify2))
    }
  }

  return (
    <>
      <>
        {currentUser?.result._id === channel._id ? (
          <Link to="/studio/videos/upload" className={cn('sub-btn')}>
            Quản lý kênh
          </Link>
        ) : (
          <>
            {currentUser?.result.subscribedUsers.includes(channel._id) ? (
              <button className={cn('sub-btn')} onClick={() => setOpen(true)}>
                Đã đăng ký
              </button>
            ) : (
              <button className={cn('sub-btn')} onClick={handleSub}>
                Đăng ký
              </button>
            )}
          </>
        )}
      </>
      {open && (
        <ConfirmOverlay
          setOpen={setOpen}
          title={`Hủy đăng ký ${channel.name}`}
          confirmText="Hủy đăng ký"
          onConfirm={handleSub}
        />
      )}
    </>
  )
}

export default SubcribeButton
