// import { useParams } from 'react-router-dom'
// import { useGetUserById } from '@/lib/react-query/queriesAndMutations'
// import Loading from '@/components/Loading'
// import { useUserContext } from '@/context/AuthContext'
import UpdateProfileForm from '@/_auth/forms/UpdateProfileForm'

const UpdateProfile = () => {
  // const { id } = useParams()
  // const { user } = useUserContext();
  // const { data: currentUser, isPending } = useGetUserById(id || '')

  // if(isPending) return <Loading />

  return (
    <div className='flex flex-1'>
        <div className='common-container'>
            <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
            <img
                src='/assets/icons/people.svg'
                width={36}
                height={36}
                alt='add'
                />
                <h2 className='h3-bold md:h2-bold w-full dark:bg-gradient-to-r dark:from-white dark:to-primary-500 dark:text-transparent dark:bg-clip-text'>Edit Profile</h2>
            </div>
            <div className='w-full'>
            <hr className="line-break bg-gradient-to-r from-white to-primary-500 dark:bg-gradient-to-r dark:from-zinc-700 dark:to-zinc-700" />
        </div>
            <UpdateProfileForm />
        </div>
    </div>
  )
}

export default UpdateProfile
