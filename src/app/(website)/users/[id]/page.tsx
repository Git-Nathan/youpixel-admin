'use client'

import {api} from '@/api'
import AppModal from '@/components/Common/AppModal'
import DetailImage from '@/components/FieldDetail/DetailImage'
import DetailStatus from '@/components/FieldDetail/DetailStatus'
import DetailText from '@/components/FieldDetail/DetailText'
import {handleError} from '@/utils/handleError'
import {Button, Card, Skeleton} from 'antd'
import {DateTime} from 'luxon'
import {useParams, useRouter} from 'next/navigation'
import {useQuery} from 'react-query'
import {ReactSVG} from 'react-svg'
import {toast} from 'react-toastify'

export default function UserDetail() {
  const router = useRouter()
  const params = useParams<{id: string}>()

  const {data, isLoading, refetch} = useQuery({
    queryKey: ['userDetail', params.id],
    queryFn: () => api.user.getById(params.id),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })

  const handleDelete = async (
    userId: string,
    closeModal: () => void,
    cancelLoading: () => void,
  ) => {
    try {
      await api.user.delete(userId)
      toast.success('Deleted successfully')
      refetch()
      closeModal()
    } catch (error) {
      handleError(error)
      cancelLoading()
    }
  }

  const handleActive = async (
    userId: string,
    closeModal: () => void,
    cancelLoading: () => void,
  ) => {
    try {
      await api.user.active(userId)
      toast.success('Active successfully')
      closeModal()
      refetch()
    } catch (error) {
      handleError(error)
      cancelLoading()
    }
  }

  const handleEdit = () => {
    router.replace(`/users/${data?.data?.data?._id}/edit`)
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
            <Button
              type='primary'
              className='!bg-[#0ea5e9] !px-3'
              disabled={isLoading}
              onClick={handleEdit}
              icon={
                <ReactSVG className='h-[20px] w-[20px]' src='/icons/edit.svg' />
              }
            >
              Edit
            </Button>

            {data?.data?.data?.active ? (
              <AppModal
                title='Confirm Delete'
                handleConfirm={(closeModal, cancelLoading) => {
                  handleDelete(
                    data?.data?.data?._id || '',
                    closeModal,
                    cancelLoading,
                  )
                }}
                content={`Are you sure you want to delete this user: ${data?.data?.data?.name}`}
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
            ) : (
              <AppModal
                title='Active User'
                handleConfirm={(closeModal, cancelLoading) => {
                  handleActive(
                    data?.data?.data?._id || '',
                    closeModal,
                    cancelLoading,
                  )
                }}
                content={`Are you sure you want to active this user: ${data?.data?.data?.name}`}
              >
                {(showModal) => (
                  <Button
                    type='primary'
                    className='!bg-color-success !px-3'
                    onClick={showModal}
                    disabled={isLoading}
                    icon={
                      <ReactSVG
                        className='h-[20px] w-[20px]'
                        src='/icons/tick-circle.svg'
                      />
                    }
                  >
                    Active
                  </Button>
                )}
              </AppModal>
            )}
          </>
        )}
      </div>

      <Card
        title={
          data?.data?.data?.email ? (
            `User: ${data?.data?.data?.email}`
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

            <DetailImage
              title='Picture'
              className='mt-3'
              src={data?.data?.data?.picture || ''}
            />

            <DetailText className='mt-3' title='Email'>
              {data?.data?.data?.email}
            </DetailText>

            <DetailText className='mt-3' title='Name'>
              {data?.data?.data?.name}
            </DetailText>

            <DetailText className='mt-3' title='Number of subscribers'>
              {data?.data?.data?.numOfSubscriber}
            </DetailText>

            <DetailStatus
              className='mt-3'
              title='Active'
              active={data?.data?.data?.active}
            />

            <DetailText className='mt-3' title='Created at'>
              {data?.data?.data?.createdAt
                ? DateTime.fromISO(data?.data?.data?.createdAt).toLocaleString(
                    DateTime.DATETIME_SHORT,
                  )
                : ''}
            </DetailText>
          </>
        )}
      </Card>
    </>
  )
}
