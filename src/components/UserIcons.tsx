import { Models } from 'appwrite';

// const TRANSLATE_AMOUNT = 200;

type UserProps = {
    user?: Models.Document
}

const UserIcons = ({user}: UserProps) => {

  return (

<>
        <div className="flex flex-col items-center justify-center transition-transform">
              <p className="base-medium text-light-1 text-center line-clamp-1">
              {user?.name}
            </p>
              <img
                src={user?.imageUrl}
                className='w-12 h-12 md:w-20 md:h-20 flex items-center justify-center object-cover whitespace-nowrap rounded-full m-2 border-b-4 border-t-4 border-t-primary-500'
                alt='users'
              />


        <p className='text-light-3 md:w-40 w-20 overflow-hidden text-ellipsis'>
            @{user?.username}
        </p>
        </div>
        </>


  );
};

export default UserIcons;
