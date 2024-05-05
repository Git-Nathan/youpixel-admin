import {AnyObject} from 'antd/es/_util/type'
import {ColumnsType} from 'antd/es/table'
import {DateTime} from 'luxon'
import Image from 'next/image'

export const videoColumn: ColumnsType<AnyObject> = [
  {
    title: 'ID',
    dataIndex: '_id',
    width: 250,
    render(value) {
      return <p className='truncate-2'>{value}</p>
    },
  },
  {
    title: 'Thumnail',
    dataIndex: 'imgUrl',
    align: 'center',
    width: 100,
    render(value) {
      return (
        <div className='flex justify-center'>
          <Image
            className='aspect-[16/9] object-cover'
            src={value}
            alt={value}
            width={100}
            height={40}
          />
        </div>
      )
    },
  },
  {
    title: 'Title',
    dataIndex: 'title',
    width: 300,
    render(value) {
      return <p className='truncate-2'>{value}</p>
    },
  },
  {
    title: 'Channel',
    dataIndex: 'channel',
    width: 200,
    render(value, record) {
      return (
        <div className='flex items-center'>
          <Image
            className='h-10 w-10 rounded-full'
            src={record?.userInfo?.picture}
            alt={record?.userInfo?.picture}
            width={40}
            height={40}
          />
          <p className='truncate-2 ml-3'>{record?.userInfo?.name}</p>
        </div>
      )
    },
  },
  {
    title: 'View',
    dataIndex: 'views',
    align: 'right',
    width: 100,
    render(value) {
      return <p className='truncate-2'>{value}</p>
    },
  },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    width: 200,
    key: 'createdAt',
    render(value) {
      return DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_SHORT)
    },
  },
]
