'use client'

import {api} from '@/api'
import AppModal from '@/components/Common/AppModal'
import AppTable from '@/components/Table/AppTable'
import {videoColumn} from '@/components/Table/TableColumn/videoColumn'
import {useDebounce} from '@/hooks/useDebounce'
import {handleError} from '@/utils/handleError'
import {Button, Tooltip} from 'antd'
import {AnyObject} from 'antd/es/_util/type'
import {ColumnsType} from 'antd/es/table'
import {useRouter} from 'next/navigation'
import {useMemo, useState} from 'react'
import {useQuery} from 'react-query'
import {ReactSVG} from 'react-svg'
import {toast} from 'react-toastify'

function DenidedVideosPage() {
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1)
  const {value: searchQuery, setValue: setSearchQuery} = useDebounce('', 1000)

  const {data, isFetching, refetch} = useQuery({
    queryKey: ['denidedVideoList', currentPage, searchQuery],
    queryFn: () => api.video.getListDenided(currentPage, searchQuery || ''),
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
      closeModal()
      refetch()
    } catch (error) {
      handleError(error)
      cancelLoading()
    }
  }

  const handleGoToDetail = (id: string) => {
    router.push(`/videos/${id}`)
  }

  const handleApprove = async (
    id: string,
    closeModal: () => void,
    cancelLoading: () => void,
  ) => {
    try {
      await api.video.approve(id)
      toast.success('Approved successfully')
      closeModal()
      refetch()
    } catch (error) {
      handleError(error)
      cancelLoading()
    }
  }

  const tableData = useMemo(() => data?.data?.data || [], [data])

  const tableColumn: ColumnsType<AnyObject> = [
    ...videoColumn,
    {
      title: 'Actions',
      key: 'actions',
      align: 'right',
      fixed: 'right',
      width: 170,
      render(value, record) {
        return (
          <div
            className='flex justify-end space-x-2'
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <Tooltip title='Detail'>
              <Button
                type='primary'
                className='!bg-[#71717a]'
                icon={<ReactSVG src='/icons/eye.svg' />}
                size={'middle'}
                onClick={() => {
                  handleGoToDetail(record._id)
                }}
              />
            </Tooltip>

            <AppModal
              title='Approve video'
              handleConfirm={(closeModal, cancelLoading) => {
                handleApprove(record._id, closeModal, cancelLoading)
              }}
              content={`Are you sure you want to approve this video: ${record.title}`}
            >
              {(showModal) => (
                <Tooltip title='Approve'>
                  <Button
                    type='primary'
                    className='!bg-color-success'
                    icon={
                      <ReactSVG
                        className='h-[24px] w-[24px]'
                        src='/icons/tick-circle.svg'
                      />
                    }
                    size={'middle'}
                    onClick={showModal}
                  />
                </Tooltip>
              )}
            </AppModal>

            <AppModal
              title='Confirm Delete'
              handleConfirm={(closeModal, cancelLoading) => {
                handleDelete(record._id, closeModal, cancelLoading)
              }}
              content={`Are you sure you want to delete this video: ${record.title}`}
            >
              {(showModal) => (
                <Tooltip title='Delete'>
                  <Button
                    type='primary'
                    danger
                    icon={
                      <ReactSVG
                        className='h-[24px] w-[24px]'
                        src='/icons/delete.svg'
                      />
                    }
                    size={'middle'}
                    onClick={showModal}
                  />
                </Tooltip>
              )}
            </AppModal>
          </div>
        )
      },
    },
  ]

  return (
    <AppTable
      onSearchQueryChange={(e) => {
        setSearchQuery(e.target.value)
      }}
      searchPlaceholder='Search by title...'
      dataSource={tableData}
      title='Denided Videos'
      columns={tableColumn}
      currentPage={currentPage}
      isLoading={isFetching}
      total={data?.data?.total || 0}
      onPageChange={setCurrentPage}
      scrollSize={800}
      onClickToRow={(e, record) => {
        handleGoToDetail(record._id)
      }}
    />
  )
}

export default DenidedVideosPage
