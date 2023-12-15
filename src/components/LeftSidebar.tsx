import { Link, useNavigate, NavLink, useLocation } from "react-router-dom"

import { useSignOutAccount } from "../lib/react-query/queriesAndMutations"
import { useEffect} from 'react'
import { useUserContext } from "../context/AuthContext"
import { sidebarLinks } from "../constants"
import { useTheme } from "@/hooks/useTheme"
import { Button } from "./ui/button"


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
            <hr className="line-break sidebar bg-gradient-to-r from-white to-primary-500 dark:bg-gradient-to-r dark:from-zinc-700 dark:to-zinc-700" />
        </div>

            <ul className="flex flex-col gap-6">
                    {sidebarLinks.map((link: INavLink) => {
                        const isActive = pathname === link.route

                        return (
                            <li key={link.label} className={`leftsidebar-link group relative ${isActive && ` text-white rounded bg-primary-500`}`}>
                            {!isActive && <span className="absolute -bottom-1 left-0 w-0 h-1 bg-primary-500 transition-all group-hover:w-full"></span>}
                            <NavLink to={link.route} className={`flex gap-4 items-center p-4 ${isActive && `hover:border-none`}`}>

                                <img src={link.imgURL} alt={link.label} className={`${isActive && `invert-white`}`} />
                                {link.label}
                            </NavLink>
                            </li>
                        )
                    })}

                    <ThemeToggleButton />

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
    </nav>
  )
}

export default LeftSidebar

function ThemeToggleButton() {
    const { theme, setTheme } = useTheme()

    function toggleTheme(){
        setTheme(theme === "light" ? 'dark' : 'light')

    }
    return (
        <div className="flex justify-start">
          <Button
          onClick={toggleTheme}
        variant="ghost"
            className="data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800"
          >
            <div className="flex w-10 h-5 bg-primary-500 dark:bg-dark-4 rounded-full">
                <span className={`h-5 w-5 rounded-full shadow-lg bg-white transition-all duration-500 dark:ml-5 dark:bg-primary-500` }></span>
            </div>
          </Button>
          <p className="flex items-center base-medium">Dark Mode</p>
          </div>
    )
  }
