import Link from 'next/link'

export interface IUsersPageProps {}

function UsersPage(props: IUsersPageProps) {
  return (
    <div className='mx-10 my-10'>
      <Link href='/users/create'>Go to create page</Link>
    </div>
  )
}

export default UsersPage
