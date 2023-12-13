import { Link, useNavigate } from "react-router-dom"
import { Button } from "./Button"
import { useSignOutAccount } from "../lib/react-query/queriesAndMutations"
import { useEffect } from 'react'
import { useUserContext } from "../context/AuthContext"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useTheme } from "@/hooks/useTheme"
import { THEME_OPTIONS } from "@/context/ThemeProvier"



const Navbar = () => {

    const { mutate: signOut } = useSignOutAccount()





  return (
    <div className='topbar'>
        <div className="flex-between py-4 px-5">
            <Link to='/' className="flex gap-3 items-center">
            <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={230}
            height={325} />

            </Link>
            <div className="flex gap-4">
                <Button variant='ghost' className="shad-button_ghost" onClick={() => signOut()}>
                    <img
                    src="/assets/icons/logout.svg"
                    alt="logout"
                    />
                </Button>
                <ThemeToggleButton/>

            </div>
        </div>

    </div>
  )
}

function ThemeToggleButton(){
    const { user } = useUserContext()
    const { mutate: signOut, isSuccess } = useSignOutAccount()
    const { setTheme } = useTheme()
    const navigate = useNavigate()
    useEffect(() => {
        if (isSuccess) {
            navigate('sign-in')

        }
    }, [isSuccess])

    return (
        <DropdownMenu>
          <DropdownMenuTrigger>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3" >
                    <img src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
                    alt="profile"
                    className="h-8 w-8 rounded-full"/>

                </Link>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
                <DropdownMenuItem>
                <Link to={`/profile/${user.id}`} className="flex-center gap-3" >
                    Profile
                </Link>
                </DropdownMenuItem>
                {THEME_OPTIONS.map(theme => (
                    <DropdownMenuItem
                    key={theme}
                    onClick={() => setTheme(theme)}
                    >{theme}

                    </DropdownMenuItem>

                ))}
                <DropdownMenuItem>
                <Button variant='ghost' className="shad-button_ghost" onClick={() => signOut()}>
                    Logout
                    <img
                    src="/assets/icons/logout.svg"
                    alt="logout"
                    />

                </Button>
                </DropdownMenuItem>
          </DropdownMenuContent>


        </DropdownMenu>
      )
}

export default Navbar
