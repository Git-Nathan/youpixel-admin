import {api} from '@/api'
import {IUser} from '@/interfaces/user'
import {handleError} from '@/utils/handleError'
import {Button, Card, Form, FormProps, Input, Skeleton} from 'antd'
import {useParams, useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'

const userInitialValues = {
  name: '',
  email: '',
  picture: '',
}

export interface IUserFormProps {
  isEdit?: boolean
}

export default function UserForm(props: IUserFormProps) {
  const router = useRouter()
  const params = useParams<{id: string}>()

  const [initialValues, setInitialValues] = useState<IUser>(userInitialValues)
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await api.user.getById(params.id)
        setInitialValues(res?.data?.data as IUser)
      } catch (error) {
        handleError(error)
      } finally {
        setisLoading(false)
      }
    })()
  }, [])

  const handleCancel = () => {
    router.replace(`/users/${initialValues?._id}`)
  }

  const onFinish: FormProps<IUser>['onFinish'] = (values) => {
    console.log('Success:', values)
  }

  return (
    <>
      <Card
        title={
          props.isEdit ? (
            initialValues?.email ? (
              `Edit user: ${initialValues?.email}`
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
            initialValues={initialValues}
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

            <Form.Item<IUser>
              label='Email'
              name='email'
              rules={[
                {required: true, message: 'Please enter your email!'},
                {type: 'email', message: 'The input is not valid E-mail!'},
              ]}
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

              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Card>
    </>
  )
}
