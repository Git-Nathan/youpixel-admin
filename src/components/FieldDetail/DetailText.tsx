import clsx from 'clsx'
import {ReactNode} from 'react'

export interface IDetailTextProps {
  title: string
  children: ReactNode
  className?: string
}

export default function DetailText(props: IDetailTextProps) {
  return (
    <div className={clsx('flex flex-col', props.className)}>
      <h3 className='ml-1 text-lg font-bold'>{props.title}</h3>
      <div className='mt-1 whitespace-pre-wrap rounded-md border border-solid border-[#555555] px-4 py-2'>
        {props.children}
      </div>
    </div>
  )
}
