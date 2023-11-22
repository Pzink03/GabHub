import Loading from '@/components/Loading'
import { useGetUsers } from '@/lib/react-query/queriesAndMutations'


interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const AllUsers = () => {
  const {data: users, isPending: isLoading} = useGetUsers()

  console.log(users)

  if(isLoading){
    return(
      <div className="flex-center w-full h-full">
        <Loading />
      </div>
    )
  }



  return (
    <div className='explore-container'>
        <div className='explore-inner_container'>
            <h2 className='h3-bold md:h2=bold w-full'>Social Circle Users</h2>
            <div >
              <ul className='grid-container'>
                {users?.documents.map((user, index) => (
                  <li key={index} className='min-w-80 flex flex-col justify-center items-center gap-2 bg-dark-4 border-dark-4 rounded p-10'>
                    <img
                    src={user.imageUrl}
                    className='h-20 w-20 rounded-full object-cover object-top'
                    alt='user'
                    />
                    <h1 className="text-center md:text-xl w-full font-bold mt-2">
                        {user.name}
                    </h1>
                    <p className="small-regular md:body-medium text-light-3 text-center">
                      @{user.username}
                    </p>
                    <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={user.posts.length} label="Posts" />
              <StatBlock value={user.liked.length} label="Liked Posts" />

            </div>

                  </li>

                ))}

              </ul>
            </div>
        </div>
    </div>
  )
}

export default AllUsers
