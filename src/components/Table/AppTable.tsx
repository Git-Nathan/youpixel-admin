import {Input, Pagination, Table} from 'antd'
import {AnyObject} from 'antd/es/_util/type'
import {ColumnsType} from 'antd/es/table'
import {ChangeEvent, MouseEvent} from 'react'

export interface IAppTableProps {
  columns: ColumnsType<AnyObject>
  searchPlaceholder?: string
  title?: string
  dataSource: readonly AnyObject[]
  currentPage: number
  isLoading: boolean
  total: number
  onPageChange: (page: number) => void
  scrollSize: number
  onClickToRow?: (event: MouseEvent<any>, record: any) => void
  onSearchQueryChange?: (value: ChangeEvent<HTMLInputElement>) => void
}

export default function AppTable(props: IAppTableProps) {
  return (
    <>
      <h1 className='text-2xl font-bold'>{props?.title}</h1>

      {props.onSearchQueryChange && (
        <div className='mt-2 flex justify-between'>
          <Input
            className='max-w-[300px]'
            placeholder={props.searchPlaceholder}
            onChange={props.onSearchQueryChange}
          />
        </div>
      )}

      <Table
        className='mb-4 mt-3'
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
          defaultPageSize={20}
          showSizeChanger={false}
          onChange={props.onPageChange}
        />
      </div>
    </>
  )
}
