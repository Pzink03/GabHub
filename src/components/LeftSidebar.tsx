import { Link, useNavigate, NavLink, useLocation } from "react-router-dom"
import { Button } from "./Button"
import { useSignOutAccount } from "../lib/react-query/queriesAndMutations"
import { useEffect } from 'react'
import { useUserContext } from "../context/AuthContext"
import { sidebarLinks } from "../constants"


const LeftSidebar = () => {

    const { mutate: signOut, isSuccess } = useSignOutAccount()
    const navigate = useNavigate()
    const { user } = useUserContext()

    const { pathname } = useLocation()



    type INavLink = {
        imgURL: string;
        route: string;
        label: string;
      };

    useEffect(() => {
        if (isSuccess) {
            navigate('sign-in')

        }
    }, [isSuccess])

  return (
    <nav className='leftsidebar'>
        <div className='flex flex-col gap-11'>
            <Link to='/' className='flex gap-3 items-center'>
                <img
                src='/assets/images/logo.svg'
                alt='logo'
                width={300}
                height={36}
                />
            </Link>

            <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
                <img
                src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
                alt="profile"
                className="w-16 h-16 object-cover object-top whitespace-nowrap rounded-full border-4 border-primary-500 p-1"/>
                <div className="flex flex-col">
                    <p className="body-bold">
                        {user.name}
                    </p>
                    <p className="small-regular text-light-3">
                        @{user.username}

                    </p>
                </div>
            </Link>
            <div className='w-full'>
            <hr className="line-break sidebar" />
        </div>

            <ul className="flex flex-col gap-6">
                    {sidebarLinks.map((link: INavLink) => {
                        const isActive = pathname === link.route

                        return (
                            <li key={link.label} className={`leftsidebar-link group ${isActive && ` text-white rounded bg-primary-500`}`}>
                            <NavLink to={link.route} className={`flex gap-4 items-center p-4 hover:border-b-4 ${isActive && `hover:border-none`} hover:border-primary-500 hover:transition transition-transform ease-in-out`}>
                                <img src={link.imgURL} alt={link.label} className={`${isActive && `invert-white`}`} />
                                {link.label}
                            </NavLink>
                            </li>
                        )
                    })}
                </ul>

        </div>
        <div className="hover:bg-primary-500 rounded hover:transition transition-transform ease-in-out">
        <Button variant="ghost" className="shad-button_ghost w-full p-4" onClick={() => signOut()}>
            <img src="/assets/icons/logout.svg" className="hover:invert-white" alt="logout"/>
            <p className="small-medium lg:base-medium">
                Logout
            </p>
        </Button>
        </div>
        {/* <div className="flex flex-col gap-6 ">
        <Button className="leftsidebar-link" onClick={() => signOut()}>
            <div className=" hover:invert-white flex gap-4 items-center p-4">
                    <img
                    src="assets/icons/logout.svg"
                    alt="logout"
                    className=""
                    />
                    <p className="flex flex-center items-center">
                        Logout

                    </p>
            </div>
        </Button>
        </div> */}
    </nav>
  )
}

export default LeftSidebar
