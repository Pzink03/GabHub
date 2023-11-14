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
                className="h-14 w-14 rounded-full object-cover object-top"/>
                <div className="flex flex-col">
                    <p className="body-bold">
                        {user.name}
                    </p>
                    <p className="small-regular text-light-3">
                        @{user.username}

                    </p>
                </div>
            </Link>

            <ul className="flex flex-col gap-6">
                    {sidebarLinks.map((link: INavLink) => {
                        const isActive = pathname === link.route

                        return (
                            <li key={link.label} className={`leftsidebar-link group ${isActive && `bg-primary-500`}`}>
                            <NavLink to={link.route} className="flex gap-4 items-center p-4">
                                <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && `invert-white`}`} />
                                {link.label}
                            </NavLink>
                            </li>
                        )
                    })}
                </ul>

        </div>
        <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
            <img src="/assets/icons/logout.svg" alt="logout"/>
            <p className="small-medium lg:base-medium">
                Logout
            </p>
        </Button>
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
