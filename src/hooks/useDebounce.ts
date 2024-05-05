import {useCallback, useRef, useState} from 'react'

export function useDebounce(initValue: any, delayMS: number) {
  const [value, setStateValue] = useState(initValue)

  const timeoutId = useRef<NodeJS.Timeout>()

  const setValue = useCallback((debounceValue: any) => {
    clearTimeout(timeoutId.current)

    timeoutId.current = setTimeout(() => {
      setStateValue(debounceValue)
    }, delayMS)
  }, [])

  return {value: value, setValue}
}
