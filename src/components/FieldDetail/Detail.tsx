import clsx from 'clsx'
import {ReactNode} from 'react'

export interface IDetailProps {
  title: string
  children: ReactNode
  className?: string
}

export default function Detail(props: IDetailProps) {
  return (
    <div className={clsx('flex flex-col', props.className)}>
      <h3 className='ml-1 text-lg font-bold'>{props.title}</h3>
      <div className='mt-2'>{props.children}</div>
    </div>
  )
}
