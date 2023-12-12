import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";
import { LikedPosts } from "@/_root/pages";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import Loading from "@/components/Loading";
import GridPostList from "@/components/GridPostList";


interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-dark-2">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  const { data: currentUser } = useGetUserById(id || "");
  console.log(currentUser)

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loading />
      </div>
    );

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full object-cover"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentUser.username}
              </p>
            </div>

          <div className=" pt-2 flex md:justify-start justify-center gap-4">
            <div className={` ${user.id !== currentUser.$id && "hidden"}`}>
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className={`h-12 bg-light-2 px-5 text-dark-4 flex-center gap-2 rounded-lg ${
                  user.id !== currentUser.$id && "hidden"
                }`}>
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                  className="hover:invert-white"
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </div>
          </div>
            <div className="flex gap-8 mt-5 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock value={currentUser.liked.length} label="Liked Posts" />
              <StatBlock value={currentUser.save.length} label="Saved Posts" />
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio}
            </p>
          </div>


        </div>

      </div>
      <div className='w-full'>
            <hr className="line-break sidebar" />
        </div>

      {currentUser.$id === user.id && (
        <div className="flex max-w-5xl w-full border-b-4 pb-4">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-primary-500 text-white"
            }`}>
            <img
              src={"/assets/icons/posts.svg"}
              alt="posts"
              width={20}
              height={20}
              className={`${
                pathname === `/profile/${id}` && "!invert-white"
              }`}
            />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` && "!bg-primary-500 text-white"
            }`}>
            <img
              src={"/assets/icons/like.svg"}
              alt="like"
              width={20}
              height={20}
              className={`${
                pathname === `/profile/${id}/liked-posts` && "!invert-white"
              }`}
            />
            Liked Posts
          </Link>
        </div>
      )}


      <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser.posts} showUser={false} />}
        />
        {currentUser.$id === user.id && (
          <Route path="/liked-posts" element={<LikedPosts />} />
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
// import { Button } from "@/components/Button";
// import GridPostList from "@/components/GridPostList";
// import Loading from "@/components/Loading";
// import { useUserContext } from "@/context/AuthContext"
// import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
// import { Link, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom"
// import { LikedPosts } from ".";



// const Profile = () => {
//   const { id } = useParams();
//   const { user } = useUserContext();
//   const { pathname } = useLocation();

//   const { data: currentUser } = useGetUserById(id || "");

//   if (!currentUser)
//     return (
//       <div className="flex-center w-full h-full">
//         <Loading />
//       </div>
//     );

//     const isCurrentUser = currentUser.$id === user.id;
//     const isLikedPostsRoute = pathname.includes("/liked-posts");

//   return (
//     <div className="flex flex-col w-full p-10 flex-1">
//       <div className="flex gap-2 items-center w-full">
//       <img
//       src={currentUser.imageUrl || '/assets/icons/profile-placeholder.svg'}
//       alt="profile"
//       className="h-14 w-14 md:h-32 md:w-32 rounded-full object-cover object-top"
//       // width={40}
//       // height={40}
//       />
//       <div className="flex flex-col w-full">
//         <h1 className="text-left h3-semibold md:h1-semibold">
//           {currentUser.name}
//         </h1>
//         <p className="small-regular text-light-3 text-left">
//           @{currentUser.username}
//         </p>
//         <p className="small-medium md:base-medium text-left mt-4 max-w-screen-sm">
//             {currentUser.bio}
//           </p>
//       </div>
//       </div>
//       <div className="flex gap-2">
//         <div className={`${user.id !== currentUser.$id && "hidden"}`}>
//           <Link to={`/update-profile/${currentUser.$id}`} className={`h-10 bg-dark-4 p-2 mt-4 text-light-1 flex-center gap-2 rounded-lg ${
//                       user.id !== currentUser.$id && "hidden"
//                     }`}>
//           <img
//             src="/assets/icons/edit.svg"
//             alt="edit"
//             className=""
//             width={20}
//             height={20}
//             />
//             Edit Profile
//           </Link>
//         </div>
//       </div>
//       {isCurrentUser && (
//         <div className="flex max-w-5xl w-full">
//           <Link
//             to={`/profile/${id}`}
//             className={`profile-tab rounded-l-lg ${
//               pathname === `/profile/${id}` && "!bg-dark-3"
//             }`}>
//             <img
//               src={"/assets/icons/posts.svg"}
//               alt="posts"
//               width={20}
//               height={20}
//             />
//             Posts
//           </Link>
//           <Link
//             to={`/profile/${id}/liked-posts`}
//             className={`profile-tab rounded-r-lg ${
//               pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
//             }`}>
//             <img
//               src={"/assets/icons/like.svg"}
//               alt="like"
//               width={20}
//               height={20}
//             />
//             Liked Posts
//           </Link>
//         </div>
//       )}

// <Routes>
//         <Route
//           index
//           element={<GridPostList posts={currentUser.posts} showUser={false} />}
//         />
//         {isCurrentUser && isLikedPostsRoute && (
//           <Route path="/liked-posts" element={<LikedPosts />} />
//         )}
//       </Routes>
//       <Outlet />
//     </div>
//   )
// }

// export default Profile
