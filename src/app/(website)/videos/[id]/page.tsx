'use client'

import {api} from '@/api'
import AppModal from '@/components/Common/AppModal'
import DetailText from '@/components/FieldDetail/DetailText'
import {handleError} from '@/utils/handleError'
import {Button, Card, Skeleton} from 'antd'
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
            <DetailText title='ID'>{data?.data?.data?._id}</DetailText>
          </>
        )}
      </Card>
    </>
  )
}
