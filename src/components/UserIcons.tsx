import { Models } from 'appwrite';
import { Link } from 'react-router-dom';

// const TRANSLATE_AMOUNT = 200;

type UserProps = {
    user?: Models.Document
}

const UserIcons = ({user}: UserProps) => {

  return (

<>
        <div className="flex flex-col items-center justify-center transition-transform">
              <p className="font-bold text-light-1 text-center line-clamp-1">
              {user?.name}
            </p>
            <Link to={`/profile/${user?.$id}`}>
              <img
                src={user?.imageUrl}
                className='w-12 h-12 md:w-20 md:h-20 object-cover whitespace-nowrap rounded-full border-4 border-primary-500 p-1'
                alt='users'
              />
              </Link>


        <p className='text-light-3 mt-2 md:w-40 w-20 overflow-hidden text-ellipsis'>
            @{user?.username}
        </p>
        </div>
        </>


  );
};

export default UserIcons;
