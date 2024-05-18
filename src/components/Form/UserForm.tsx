import {api} from '@/api'
import {IUpdateUser, IUser} from '@/interfaces/user'
import {handleError} from '@/utils/handleError'
import {Button, Card, Form, FormProps, Input, Skeleton} from 'antd'
import {useParams, useRouter} from 'next/navigation'
import {useState} from 'react'
import {useQuery} from 'react-query'

export interface IUserFormProps {
  isEdit?: boolean
}

export default function UserForm(props: IUserFormProps) {
  const router = useRouter()
  const params = useParams<{id: string}>()

  const [submiting, setSubmiting] = useState(false)

  const {data, isLoading} = useQuery({
    queryKey: ['userDetail', params.id],
    queryFn: () => api.user.getById(params.id),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })

  const handleCancel = () => {
    router.replace(`/users/${data?.data?.data?._id}`)
  }

  const onFinish: FormProps<IUpdateUser>['onFinish'] = async (values) => {
    setSubmiting(true)
    try {
      await api.user.update(data?.data?.data?._id || '', values)
      router.replace(`/users/${data?.data?.data?._id}`)
    } catch (error) {
      handleError(error)
    } finally {
      setSubmiting(false)
    }
  }

  return (
    <>
      <Card
        title={
          props.isEdit ? (
            data?.data?.data?.email ? (
              `Edit user: ${data?.data?.data?.email}`
            ) : (
              <Skeleton.Input active size='small' />
            )
          ) : (
            'Create user'
          )
        }
        bordered={false}
      >
        {isLoading ? (
          <Skeleton active />
        ) : (
          <Form
            name='basic'
            initialValues={data?.data?.data}
            layout='vertical'
            onFinish={onFinish}
            autoComplete='off'
          >
            <Form.Item<IUser>
              label='Name'
              name='name'
              rules={[{required: true, message: 'Please input your name!'}]}
            >
              <Input />
            </Form.Item>

            <div className='flex justify-end space-x-2'>
              <Button
                type='default'
                className='!px-3'
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>

              <Button
                type='primary'
                htmlType='submit'
                loading={isLoading || submiting}
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Card>
    </>
  )
}
