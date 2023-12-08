import Loading from "@/components/Loading"
import PostStats from "@/components/PostStats"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/AuthContext"
import { useDeletePost, useGetPostById } from "@/lib/react-query/queriesAndMutations"
import { multiFormatDateString } from "@/lib/utils"
import { Link, useNavigate, useParams } from "react-router-dom"

const PostDetails = () => {
  const { id } = useParams()
  const { data: post, isPending } = useGetPostById(id || '')
  const { user } = useUserContext()
  const navigate = useNavigate()

  const {mutate: deletePost} = useDeletePost()

  const handleDeletePost = () => {
    deletePost({ postId: id, imageId: post?.imageId });
    navigate(-1);
  };

  if(!post) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loading />
      </div>
    )
  }

  return (
    <div className="post_details-container">
      {isPending ? <Loading /> : (
        <div className="post_details-card">
          <img
          src={post?.imageUrl}
          alt="post"
          className="post_details-img"
          />
          <div className='post_details-info'>
            <div className="flex-between w-full">
                <Link to={`/profile/${post?.creator.$id}`} className="flex items-center gap-3">
                    <img
                    src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
                    alt='creator'
                    className='rounded-full w-8 h-8 lg:w-12 lg:h-12'
                    />


                <div className='flex flex-col'>
                    <p className='base-medium lg:body-bold text-light-1'>
                        {post?.creator.name}
                    </p>
                    <div className='flex-center gap-2 text-light-3'>
                        <p className='subtle-semibold lg:small-regular'>
                            {multiFormatDateString(post?.$createdAt)}
                        </p>
                        -
                        <p className='subtle-semibold lg:small-regular'>
                            {post?.location}
                        </p>
                    </div>
                </div>
                </Link>

                <div className="flex-center">
                  <Link to={`/update-post/${post?.$id}`} className={`${user.id !== post?.creator.$id && 'hidden'}`}>
                  <img src="/assets/icons/edit.svg" width={24} height={24} alt="edit" />
                  </Link>
                  <DeleteJobListingDialogue deleteUserPost={handleDeletePost}/>


                  {/* <Button onClick={handleDeletePost}
                  variant='ghost'
                  className={`ghost_details-delete-btn ${user.id !== post?.creator.$id && 'hidden'}`}
                  > */}



                  {/* </Button> */}
                </div>

            </div>

            <hr className="border w-full border-dark-4/80"></hr>

            <div className='flex flex-col flex-1 w-full small-medium lg:base-regular'>
                <p>
                    {post?.caption}
                </p>
                <ul className='flex gap-1 mt-2'>
                    {post?.tags.map((tag: string) => (
                        <li key={tag} className='text-light-3'>
                            #{tag}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
            </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails


type deleteJobListingDialogueProps = {
  deleteUserPost: () => void
}

function DeleteJobListingDialogue({ deleteUserPost }: deleteJobListingDialogueProps) {
  const { id } = useParams()
  const { data: post } = useGetPostById(id || '')
  const { user } = useUserContext()
  return (
  <AlertDialog >
      <AlertDialogTrigger asChild>
          <Button className={`ghost_details-delete-btn ${user.id !== post?.creator.$id && 'hidden'}`}>
          <img
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    width={24}
                    height={24}
                    />
          </Button>
      </AlertDialogTrigger>
  <AlertDialogContent className="bg-dark-4 flex flex-col gap-10">
      <AlertDialogHeader>
          <AlertDialogTitle>
          Are you sure you want to delete this post?
          </AlertDialogTitle>
          <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your post.
          </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
          <AlertDialogCancel className="bg-primary-500 border-0 hover:bg-primary-600">Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-primary-500 hover:bg-primary-600" onClick={deleteUserPost}>Confirm</AlertDialogAction>
      </AlertDialogFooter>
  </AlertDialogContent>
  </AlertDialog>
  )
}
