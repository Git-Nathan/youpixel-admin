import clsx from 'clsx'
import {ReactSVG} from 'react-svg'

export interface IDetailStatusProps {
  title: string
  active?: boolean
  className?: string
}

export default function DetailStatus(props: IDetailStatusProps) {
  return (
    <div className={clsx('flex flex-col', props.className)}>
      <h3 className='ml-1 text-lg font-bold'>{props.title}</h3>
      {props?.active ? (
        <ReactSVG
          className='mt-2 h-[24px] w-[24px] text-color-success'
          src='/icons/tick-circle.svg'
        />
      ) : (
        <ReactSVG
          className='mt-2 h-[24px] w-[24px] text-color-danger'
          src='/icons/close-circle.svg'
        />
      )}
    </div>
  )
}
