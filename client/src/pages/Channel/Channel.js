import classNames from 'classnames/bind'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchChannel, getUserVideos } from '~/api/api'
import VideoBox from '~/components/Boxs/VideoBoxs/VideoBox'
import styles from './Channel.module.scss'
import BlockButton from '~/components/Button/BlockButton'
import Loading from '~/components/Loading'

const cn = classNames.bind(styles)

function Channel() {
  const { reload } = useSelector((store) => store.videoReducer)
  const { id } = useParams()
  const [channel, setChannel] = useState({})
  const [videos, setVideos] = useState([])
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [numberOfPages, setNumberOfPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const getMoreVideos = useCallback(async () => {
    if (page >= numberOfPages) {
      setHasMore(false)
    }
    const { data } = await getUserVideos(id, page)
    setVideos((prev) => prev.concat(data.data))
    setPage((prev) => ++prev)
    setNumberOfPages(data.numberOfPages)
    setIsLoading(false)
  }, [id, numberOfPages, page])

  const intObserver = useRef()

  const scrollThreshold = useCallback(
    (threshold) => {
      if (isLoading) return

      if (intObserver.current) intObserver.current.disconnect()

      intObserver.current = new IntersectionObserver((items) => {
        if (items[0].isIntersecting && hasMore) {
          setIsLoading(true)
          getMoreVideos()
        }
      })

      if (threshold) intObserver.current.observe(threshold)
    },
    [getMoreVideos, hasMore, isLoading],
  )

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    setIsPageLoading(true)
    const getdata = async () => {
      const channelData = await fetchChannel(id)
      setChannel(channelData.data[0])
      const { data } = await getUserVideos(id, 1)
      if (data.data.total <= 20) {
        setHasMore(false)
      }
      setVideos(data.data)
      setNumberOfPages(data.numberOfPages)
      setPage(2)
      setIsPageLoading(false)
      setIsLoading(false)
    }
    getdata()
  }, [id, reload])

  if (isPageLoading) {
    return <Loading />
  }

  return (
    <>
      <div className={cn('wrapper-title')}>
        <div className={cn('title-left')}>
          <img
            className={cn('title-img')}
            src={channel.picture}
            alt="title img"
          />
          <div className={cn('channel-detail')}>
            <h2 className={cn('channel-name')}>{channel.name}</h2>
            <div className={cn('channel-sub')}>
              {channel.subscribers} người đăng ký
            </div>
          </div>
        </div>
        <div className={cn('title-right')}>
          <BlockButton channel={channel} />
        </div>
      </div>
      <div className={cn('separate')}></div>
      <div className={cn('wrapper-videos')}>
        <div className={cn('grid__row', 'videoboxs-row')}>
          {videos?.map((video) => (
            <VideoBox key={video._id} video={video} />
          ))}
        </div>
        {isLoading && <Loading mgt="0px" size="3em" />}
        <div className={cn('scrollThreshold')} ref={scrollThreshold}></div>
      </div>
    </>
  )
}

export default Channel
