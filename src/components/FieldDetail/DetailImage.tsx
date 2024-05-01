import {Skeleton} from 'antd'
import clsx from 'clsx'
import Image from 'next/image'

export interface IDetailImageProps {
  title: string
  src: string
  className?: string
}

export default function DetailImage(props: IDetailImageProps) {
  return (
    <div className={clsx('flex flex-col', props.className)}>
      <h3 className='ml-1 text-lg font-bold'>{props.title}</h3>
      {!props.src ? (
        <Skeleton.Image className='mt-2 !h-[200px] !w-[200px]' />
      ) : (
        <Image
          className='mt-2'
          src={props.src}
          alt={props.src}
          width={200}
          height={200}
        />
      )}
    </div>
  )
}
