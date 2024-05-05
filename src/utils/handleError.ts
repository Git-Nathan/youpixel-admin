import {toast} from 'react-toastify'

export const handleError = (error: any) => {
  console.log('error', error)
  if (error?.response?.data?.message) {
    toast.error(error?.response?.data?.message)
  } else {
    toast.error(error.message)
  }
}
