
import PostForm from '../../_auth/forms/PostForm'

const CreatePost = () => {
  return (
    <div className='flex flex-1'>
        <div className='common-container'>
        <div className="w-full">
        <div className="flex gap-2 justify-center items-center pb-10">
        <img src='/assets/icons/people.svg' width={36} height={36} />
        <h2 className="h3-bold md:h2-bold w-full dark:bg-gradient-to-r dark:from-white dark:to-primary-600 dark:text-transparent dark:bg-clip-text">Create Post</h2>
        </div>
        <div className='w-full'>
            <hr className="line-break bg-gradient-to-r from-white to-primary-500 dark:bg-gradient-to-r dark:from-zinc-700 dark:to-zinc-700" />
        </div>
      </div>
            <PostForm action='Create' />
        </div>
    </div>
  )
}

export default CreatePost
