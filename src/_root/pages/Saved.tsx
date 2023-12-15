import GridPostList from "@/components/GridPostList";
import Loading from "@/components/Loading";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";


const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();


  const savePosts = currentUser?.save.map((savePost: Models.Document) => ({
    ...savePost.post,
    creator: {
      imageUrl: currentUser.imageUrl,
    },
  }));

  return (
    <div className="flex flex-col flex-1 items-center overflow-scroll custom-scrollbar py-10 px-5 md:p-14">
      <div className="w-full">
        <div className="flex gap-2 justify-center items-center pb-10">
        <img src='/assets/icons/people.svg' width={36} height={36} />
        <h2 className="h3-bold md:h2-bold w-full dark:bg-gradient-to-r dark:from-white dark:to-primary-600 dark:text-transparent dark:bg-clip-text">Saved Posts</h2>
        </div>
        <div className='w-full'>
            <hr className="line-break bg-gradient-to-r from-white to-primary-500 dark:bg-gradient-to-r dark:from-zinc-700 dark:to-zinc-700" />
        </div>
      </div>
      {!currentUser ? (
        <Loading />
        ) : (
          <ul className="w-full flex justify-center gap-8">
          {savePosts.length === 0 ? (
            <p>No Posts Saved</p>
          ) : (
            <GridPostList posts={savePosts} showUser={false} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;
