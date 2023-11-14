import { useParams } from 'react-router-dom'
import PostForm from '../../_auth/forms/PostForm'
import { useGetPostById, useGetUserById } from '@/lib/react-query/queriesAndMutations'
import Loading from '@/components/Loading'
import { useUserContext } from '@/context/AuthContext'
import UpdateProfileForm from '@/_auth/forms/UpdateProfileForm'

const UpdateProfile = () => {
  const { id } = useParams()
  const { user } = useUserContext();
  const { data: currentUser, isPending } = useGetUserById(id || '')

  if(isPending) return <Loading />

  return (
    <div className='flex flex-1'>
        <div className='common-container'>
            <div className='max-w-5xl flex-start gap-3 justify-start w-full'>

                <h2 className='text-center h3-bold md:h2-bold text-left w-full'>Edit Profile</h2>
            </div>
            <UpdateProfileForm />
        </div>
    </div>
  )
}

export default UpdateProfile
