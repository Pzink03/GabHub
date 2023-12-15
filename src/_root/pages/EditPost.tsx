import { useParams } from 'react-router-dom'
import PostForm from '../../_auth/forms/PostForm'
import { useGetPostById } from '@/lib/react-query/queriesAndMutations'
import Loading from '@/components/Loading'

const EditPost = () => {
  const { id } = useParams()
  const { data: post, isPending } = useGetPostById(id || '')

  if(isPending) return <Loading />

  return (
    <div className='flex flex-1'>
        <div className='common-container'>
            <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
            <img
                src='/assets/icons/gallery-add.svg'
                width={36}
                height={36}
                alt='add'
                />
                <h2 className='h3-bold md:h2-bold w-full dark:bg-gradient-to-r dark:from-white dark:to-primary-600 dark:text-transparent dark:bg-clip-text'>Edit Post</h2>
            </div>
            <PostForm action="Update" post={post} />
        </div>
    </div>
  )
}

export default EditPost
