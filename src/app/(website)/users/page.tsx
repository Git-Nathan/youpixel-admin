'use client'

import {api} from '@/api'
import AppModal from '@/components/Common/AppModal'
import AppTable from '@/components/Table/AppTable'
import {userColumn} from '@/components/Table/TableColumn/userColumn'
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

function UsersPage() {
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1)
  const {value: searchQuery, setValue: setSearchQuery} = useDebounce('', 1000)

  const {data, isLoading, refetch} = useQuery({
    queryKey: ['userList', currentPage, searchQuery],
    queryFn: () => api.user.getList(currentPage, searchQuery),
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
      closeModal()
      refetch()
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

  const handleGoToDetail = (id: string) => {
    router.push(`/users/${id}`)
  }

  const handleEdit = (id: string) => {
    router.replace(`/users/${id}/edit`)
  }

  const tableData = useMemo(() => data?.data?.data || [], [data])

  const tableColumn: ColumnsType<AnyObject> = [
    ...userColumn,
    {
      title: 'Actions',
      align: 'right',
      fixed: 'right',
      width: 130,
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

            <Tooltip title='Edit'>
              <Button
                type='primary'
                className='!bg-[#0ea5e9]'
                icon={
                  <ReactSVG
                    className='h-[24px] w-[24px]'
                    src='/icons/edit.svg'
                  />
                }
                size={'middle'}
                onClick={() => {
                  handleEdit(record._id)
                }}
              />
            </Tooltip>

            {record.active ? (
              <AppModal
                title='Confirm Delete'
                handleConfirm={(closeModal, cancelLoading) => {
                  handleDelete(record._id, closeModal, cancelLoading)
                }}
                content={`Are you sure you want to delete this user: ${record.name}`}
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
            ) : (
              <AppModal
                title='Active User'
                handleConfirm={(closeModal, cancelLoading) => {
                  handleActive(record._id, closeModal, cancelLoading)
                }}
                content={`Are you sure you want to active this user: ${record.name}`}
              >
                {(showModal) => (
                  <Tooltip title='Active'>
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
            )}
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
      searchPlaceholder='Search by email...'
      dataSource={tableData}
      title='Users'
      columns={tableColumn}
      currentPage={currentPage}
      isLoading={isLoading}
      total={data?.data?.total || 0}
      onPageChange={setCurrentPage}
      scrollSize={1300}
      onClickToRow={(e, record) => {
        handleGoToDetail(record._id)
      }}
    />
  )
}

export default UsersPage
