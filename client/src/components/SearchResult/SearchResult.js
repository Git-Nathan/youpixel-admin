import { SearchIcon } from '../icons'
import classNames from 'classnames/bind'
import styles from './SearchResult.module.scss'
import { createSearchParams } from 'react-router-dom'

const cn = classNames.bind(styles)

function SearchResult({ content, setSearchValue, navigate }) {
  const set = () => {
    setSearchValue(content)
    navigate({
      pathname: '/results',
      search: `?${createSearchParams({
        search_query: content,
      })}`,
    })
  }

  return (
    <div
      to={`/results?search_query=${content}`}
      className={cn('search-item')}
      onMouseDown={set}
    >
      <SearchIcon />
      <div>{content}</div>
    </div>
  )
}

export default SearchResult
