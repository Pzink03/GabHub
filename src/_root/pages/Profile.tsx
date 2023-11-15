
import Loading from "@/components/Loading";
import { useUserContext } from "@/context/AuthContext"
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import { Link, useParams } from "react-router-dom"



const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  // const { pathname } = useLocation();

  const { data: currentUser } = useGetUserById(id || "");

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loading />
      </div>
    );

  return (
    <div className="flex flex-col w-full p-10 flex-1">
      <div className="flex gap-2 items-center w-full">
      <img
      src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
      alt="profile"
      className="h-14 w-14 md:h-32 md:w-32 rounded-full object-cover object-top"
      // width={40}
      // height={40}
      />
      <div className="flex flex-col w-full">
        <h1 className="text-left h3-semibold md:h1-semibold">
          {currentUser.name}
        </h1>
        <p className="small-regular text-light-3 text-left">
          @{currentUser.username}
        </p>
        <p className="small-medium md:base-medium text-left mt-4 max-w-screen-sm">
            {currentUser.bio}
          </p>
      </div>
      </div>
      <div className="flex gap-2">
        <div className={`${user.id !== currentUser.$id && "hidden"}`}>
          <Link to={`/update-profile/${currentUser.$id}`} className={`h-10 bg-dark-4 p-2 mt-4 text-light-1 flex-center gap-2 rounded-lg ${
                      user.id !== currentUser.$id && "hidden"
                    }`}>
          <img
            src="/assets/icons/edit.svg"
            alt="edit"
            className=""
            width={20}
            height={20}
            />
            Edit Profile
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Profile
