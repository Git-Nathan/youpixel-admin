'use client'

import {api} from '@/api'
import AppModal from '@/components/Common/AppModal'
import Detail from '@/components/FieldDetail/Detail'
import DetailImage from '@/components/FieldDetail/DetailImage'
import DetailText from '@/components/FieldDetail/DetailText'
import {handleError} from '@/utils/handleError'
import {Button, Card, Skeleton} from 'antd'
import {DateTime} from 'luxon'
import Image from 'next/image'
import {useParams} from 'next/navigation'
import {useQuery} from 'react-query'
import {ReactSVG} from 'react-svg'
import {toast} from 'react-toastify'

export default function UserDetail() {
  const params = useParams<{id: string}>()

  const {data, isLoading, refetch} = useQuery({
    queryKey: ['videoDetail', params.id],
    queryFn: () => api.video.getById(params.id),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })

  const handleDelete = async (
    id: string,
    closeModal: () => void,
    cancelLoading: () => void,
  ) => {
    try {
      await api.video.delete(id)
      toast.success('Deleted successfully')
      refetch()
      closeModal()
    } catch (error) {
      handleError(error)
      cancelLoading()
    }
  }

  return (
    <>
      <div className='mb-4 flex justify-end space-x-2'>
        {isLoading ? (
          <>
            <Skeleton.Button />
            <Skeleton.Button />
          </>
        ) : (
          <>
            <AppModal
              title='Confirm Delete'
              handleConfirm={(closeModal, cancelLoading) => {
                handleDelete(
                  data?.data?.data?._id || '',
                  closeModal,
                  cancelLoading,
                )
              }}
              content={`Are you sure you want to delete this video: ${data?.data?.data?.title}`}
            >
              {(showModal) => (
                <Button
                  type='primary'
                  danger
                  className='!px-3'
                  onClick={showModal}
                  disabled={isLoading}
                  icon={
                    <ReactSVG
                      className='h-[20px] w-[20px]'
                      src='/icons/delete.svg'
                    />
                  }
                >
                  Delete
                </Button>
              )}
            </AppModal>
          </>
        )}
      </div>

      <Card
        title={
          data?.data?.data?.title ? (
            `Video: ${data?.data?.data?.title}`
          ) : (
            <Skeleton.Input active size='small' />
          )
        }
        bordered={false}
      >
        {isLoading ? (
          <Skeleton active />
        ) : (
          <>
            <Detail title='Video'>
              <div className='max-w-[500px]'>
                <div className='relative flex aspect-[16/9] w-full flex-col'>
                  <video
                    className='absolute left-0 top-0 h-full w-full bg-[#000000]'
                    src={data?.data?.data?.videoUrl}
                    controls
                    autoPlay
                  ></video>
                </div>
              </div>
            </Detail>

            <DetailText className='mt-3' title='ID'>
              {data?.data?.data?._id}
            </DetailText>

            <DetailImage
              title='Thumnail'
              className='mt-3'
              src={data?.data?.data?.imgUrl || ''}
            />

            <DetailText className='mt-3' title='Title'>
              {data?.data?.data?.title}
            </DetailText>

            <Detail className='mt-3' title='Channel'>
              <div className='flex items-center'>
                <Image
                  className='h-10 w-10 rounded-full'
                  src={data?.data?.data?.userInfo?.picture || ''}
                  alt={data?.data?.data?.userInfo?.picture || ''}
                  width={40}
                  height={40}
                />
                <p className='truncate-2 ml-3'>
                  {data?.data?.data?.userInfo?.name}
                </p>
              </div>
            </Detail>

            <DetailText className='mt-3' title='View'>
              {data?.data?.data?.views}
            </DetailText>

            <DetailText className='mt-3' title='Created at'>
              {DateTime.fromISO(
                data?.data?.data?.createdAt || '',
              ).toLocaleString(DateTime.DATETIME_SHORT)}
            </DetailText>
          </>
        )}
      </Card>
    </>
  )
}
