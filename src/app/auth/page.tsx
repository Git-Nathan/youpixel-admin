'use client'

import {api} from '@/api'
import {IAuth} from '@/interfaces/auth'
import {handleError} from '@/utils/helper'
import {Button, Form, Input, type FormProps} from 'antd'
import {useRouter} from 'next/navigation'
import InlineSVG from 'react-inlinesvg'
import {toast} from 'react-toastify'

export interface IAuthPageProps {}

export default function AuthPage(props: IAuthPageProps) {
  const router = useRouter()

  const onSubmit: FormProps<IAuth>['onFinish'] = async (values) => {
    try {
      const res = await api.auth.login(values)
      toast.success(res?.data?.message)
      localStorage.setItem('token', res.data?.data?.token as string)
      router.replace('/videos')
    } catch (error: any) {
      handleError(error)
    }
  }

  return (
    <div className='fixed flex h-full w-full items-center justify-center'>
      <div className='flex flex-col items-center rounded-md bg-black p-10 pb-2'>
        <InlineSVG src='/icons/logo.svg' />
        <h1 className='mb-5 mt-5'>Welcome back!</h1>
        <Form
          name='basic'
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          style={{maxWidth: 600}}
          initialValues={{remember: true}}
          onFinish={onSubmit}
          autoComplete='off'
        >
          <Form.Item<IAuth>
            label='Username'
            name='username'
            rules={[{required: true, message: 'Please input your username!'}]}
          >
            <Input />
          </Form.Item>

          <Form.Item<IAuth>
            label='Password'
            name='password'
            rules={[{required: true, message: 'Please input your password!'}]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{offset: 8, span: 16}}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
