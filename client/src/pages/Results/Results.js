import styles from './Results.module.scss'
import classNames from 'classnames/bind'
import SearchVideoBox from '~/components/Boxs/SearchVideoBox'
import { useCallback, useRef, useState } from 'react'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { addSearchResult, getVideosBySearch } from '~/api/api'
import Loading from '~/components/Loading'

const cn = classNames.bind(styles)

function Results() {
  const [videos, setVideos] = useState([])
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search_query')
  const [isWebLoading, setIsWebLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [numberOfPages, setNumberOfPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const getMoreVideos = useCallback(async () => {
    if (page >= numberOfPages) {
      setHasMore(false)
    }
    const { data } = await getVideosBySearch(
      createSearchParams({ search_query: searchQuery, page }),
    )
    setVideos((prev) => prev.concat(data.data))
    setPage((prev) => ++prev)
    setNumberOfPages(data.numberOfPages)
    setIsLoading(false)
  }, [numberOfPages, page, searchQuery])

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
    const getData = async () => {
      const { data } = await getVideosBySearch(
        createSearchParams({ search_query: searchQuery, page: 1 }),
      )
      if (data.data.total <= 20) {
        setHasMore(false)
      }
      setVideos(data.data)
      addSearchResult(searchQuery.trim())
      setNumberOfPages(data.numberOfPages)
      setPage(2)
      setIsWebLoading(false)
      setIsLoading(false)
    }
    getData()
  }, [searchQuery])

  if (isWebLoading) {
    return <Loading />
  }

  return (
    <>
      <div className={cn('wrapper-videos')}>
        {videos.length > 0 ? (
          <>
            {videos.map((video) => (
              <SearchVideoBox key={video._id} video={video} />
            ))}
            {isLoading && <Loading mgt="0px" size="3em" />}
            <div className={cn('scrollThreshold')} ref={scrollThreshold}></div>
          </>
        ) : (
          <h3 className={cn('novideos')}>Không có video nào!</h3>
        )}
      </div>
    </>
  )
}

export default Results
