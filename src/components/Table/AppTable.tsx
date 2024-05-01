import {Pagination, Table} from 'antd'
import {AnyObject} from 'antd/es/_util/type'
import {ColumnsType} from 'antd/es/table'
import {MouseEvent} from 'react'

export interface IAppTableProps {
  columns: ColumnsType<AnyObject>
  dataSource: readonly AnyObject[]
  currentPage: number
  isLoading: boolean
  total: number
  onPageChange: (page: number) => void
  scrollSize: number
  onClickToRow?: (event: MouseEvent<any>, record: any) => void
}

export default function AppTable(props: IAppTableProps) {
  return (
    <>
      <h1 className='text-2xl font-bold'>User</h1>
      <Table
        className='mb-4 mt-4'
        dataSource={props.dataSource}
        columns={props.columns}
        scroll={{x: props.scrollSize}}
        loading={props.isLoading}
        size='small'
        pagination={false}
        onRow={(record) => {
          return {
            onClick: (event) => {
              if (props.onClickToRow) {
                props.onClickToRow(event, record)
              }
            },
          }
        }}
      />
      <div className='flex w-full justify-center'>
        <Pagination
          defaultCurrent={1}
          current={props.currentPage}
          total={props.total}
          defaultPageSize={10}
          showSizeChanger={false}
          onChange={props.onPageChange}
        />
      </div>
    </>
  )
}
