
import GridPostList from "@/components/GridPostList";
import Loading from "@/components/Loading";
import { useGetCurrentUser} from "@/lib/react-query/queriesAndMutations";


const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser()



  if(!currentUser) {
    return (
    <div>
      <Loading />
    </div>
    )
  }


  return (
    <>
    {currentUser.liked.length === 0 && (
      <p>
      No Liked Posts
      </p>
    )}
    <div>
      <GridPostList posts={currentUser.liked} showUser={true} showStats={false}/>
    </div>
    </>
  )
}

export default LikedPosts
