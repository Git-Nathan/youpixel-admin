import Link from 'next/link'

export interface ICreateUserPageProps {}

export default function CreateUserPage(props: ICreateUserPageProps) {
  return (
    <div className='mx-10 my-10'>
      <Link href='/users'>Go back</Link>
    </div>
  )
}
