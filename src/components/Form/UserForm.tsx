import {api} from '@/api'
import {Button} from 'antd'
import {useParams, useRouter} from 'next/navigation'
import {useQuery} from 'react-query'

export interface IUserFormProps {
  isEdit?: boolean
}

export default function UserForm(props: IUserFormProps) {
  const router = useRouter()
  const params = useParams<{id: string}>()

  const {data, isLoading, refetch} = useQuery({
    queryKey: ['userDetail', params.id],
    queryFn: () => api.user.getById(params.id),
    keepPreviousData: true,
  })

  const handleCancel = () => {
    router.replace(`/users/${data?.data?.data?._id}`)
  }

  return (
    <>
      <div className='mb-4 flex justify-end space-x-2'>
        <Button
          type='default'
          className='!px-3'
          onClick={handleCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </>
  )
}
