import { Models } from 'appwrite'
import { Link } from 'react-router-dom';

interface StabBlockProps {
    value: string | number;
    label: string;
}
type GridUsersListProps = {
    users: Models.Document[]
}

const StatBlock = ({ value, label }: StabBlockProps) => (
    <div className="flex-center gap-2">
      <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
      <p className="small-medium lg:base-medium text-dark-2 dark:text-white">{label}</p>
    </div>
  );

const GridUsersList = ({ users }: GridUsersListProps) => {

  return (
    <ul className='grid-container'>
        {users.map((user) => (
            <li key={user.$id} className='min-w-80 flex flex-col justify-center items-center gap-4 bg-light-2 dark:bg-dark-4 border border-primary-500 hover:shadow-lg rounded p-10'>
                    <Link to={`/profile/${user.$id}`} className="flex-center gap-3" >
                    <img src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
                    alt="profile"
                    className="h-24 w-24 object-cover object-top rounded-full"/>

                </Link>
                    <h1 className="text-center md:text-xl w-full text-black dark:text-white font-bold mt-2">
                        {user.name}
                    </h1>
                    <p className="small-regular md:body-medium text-light-3 text-center">
                      @{user.username}
                    </p>
                    <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
                      <StatBlock value={user?.posts.length} label="Posts"  />
                      <StatBlock value={user.liked.length} label="Liked Posts" />
                    </div>
                  </li>
        ))}
    </ul>
  )
}

export default GridUsersList
