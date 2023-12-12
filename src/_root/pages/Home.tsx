import Loading from '@/components/Loading'
import PostCard from '@/components/PostCard'
import UserIcons from '@/components/UserIcons'
// import UserIcons from '@/components/UserIcons'
import { useGetRecentPosts, useGetUsers } from '@/lib/react-query/queriesAndMutations'
import { Models } from 'appwrite'


const Home = () => {
    const {
        data: posts,
        isLoading: isPostLoading,
        isError: isErrorPosts,
      } = useGetRecentPosts();
      const {
        data: creators,
        isLoading: isUserLoading,
        isError: isErrorCreators,
      } = useGetUsers(10);

      if (isErrorPosts || isErrorCreators) {
        return (
          <div className="flex flex-1">
            <div className="home-container">
              <p className="body-medium text-light-1">Something bad happened</p>
            </div>
            <div className="home-creators">
              <p className="body-medium text-light-1">Something bad happened</p>
            </div>
          </div>
        );
      }

      return (
        <>
      <div className="home-container">
        <div className="top-user-container">

            <div className="w-full rounded-lg border border-primary-500">
                {isUserLoading && !creators ? (
                  <div className='w-full h-full flex justify-center'>
                    <Loading/>
                    </div>
                  ) : (
                    <ul className="flex justify-between overflow-x-scroll custom-scrollbar">
                      {creators?.documents.map((creator) => (
                        <li key={creator?.$id} className='text-center flex justify-center items-center'>
                          <UserIcons user={creator} />
                        </li>
                      ))}
                    </ul>
                  )}

            </div>
        </div>
        <div className='w-full'>
            <hr className="line-break" />
        </div>
            <div className="home-posts">
              <h2 className="h3-bold md:h2-bold text-center w-full">Home Feed</h2>
              {isPostLoading && !posts ? (
                <Loading />
              ) : (
                <ul className="flex flex-col flex-1 gap-9 w-full ">
                  {posts?.documents.map((p: Models.Document) => (
                    <li key={p.$id} className="flex justify-center w-full">
                      <PostCard post={p} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          </>
      );
    };
export default Home
