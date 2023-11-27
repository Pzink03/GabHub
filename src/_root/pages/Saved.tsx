import GridPostList from "@/components/GridPostList";
import Loading from "@/components/Loading";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { User } from "lucide-react";






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
      <div className="w-full md:px-20">
        <div className="flex gap-2 justify-center items-center ">
        <User width={36} height={36} />
        <h2 className="h3-bold md:h2-bold md:w-full">Saved Posts</h2>
        </div>
      <hr className="line-break" />
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
