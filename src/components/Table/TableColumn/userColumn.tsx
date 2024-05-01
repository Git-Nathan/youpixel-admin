import {AnyObject} from 'antd/es/_util/type'
import {ColumnsType} from 'antd/es/table'
import {DateTime} from 'luxon'
import Image from 'next/image'
import {ReactSVG} from 'react-svg'

export const userColumn: ColumnsType<AnyObject> = [
  {
    title: 'ID',
    dataIndex: '_id',
    width: 300,
    render(value) {
      return <p className='truncate-2'>{value}</p>
    },
  },
  {
    title: 'Picture',
    dataIndex: 'picture',
    align: 'center',
    width: 100,
    render(value) {
      return (
        <div className='flex justify-center'>
          <Image
            className='h-10 w-10 rounded-full'
            src={value}
            alt={value}
            width={40}
            height={40}
          />
        </div>
      )
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: 300,
    render(value) {
      return <p className='truncate-2'>{value}</p>
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 200,
    render(value) {
      return <p className='truncate-2'>{value}</p>
    },
  },
  {
    title: 'Number of subscribers',
    dataIndex: 'numOfSubscriber',
    width: 180,
    align: 'right',
    render(value) {
      return <p className='truncate-2'>{value}</p>
    },
  },
  {
    title: 'Active',
    dataIndex: 'active',
    width: 100,
    align: 'center',
    render(value) {
      return (
        <div className='flex justify-center'>
          {value ? (
            <ReactSVG
              className='h-[24px] w-[24px] text-color-success'
              src='/icons/tick-circle.svg'
            />
          ) : (
            <ReactSVG
              className='h-[24px] w-[24px] text-color-danger'
              src='/icons/close-circle.svg'
            />
          )}
        </div>
      )
    },
  },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    render(value) {
      return DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_SHORT)
    },
  },
]
