import { Link, useNavigate } from "react-router-dom"
import { Button } from "./Button"
import { useSignOutAccount } from "../lib/react-query/queriesAndMutations"
import { useEffect } from 'react'
import { useUserContext } from "../context/AuthContext"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { ThemeToggleButton } from "./LeftSidebar"
import { cn } from "@/lib/utils"



const Navbar = () => {
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
                <ThemeToggleDropdown/>


        </div>

    </div>
  )
}

function ThemeToggleDropdown(){
    const { user } = useUserContext()
    const { mutate: signOut, isSuccess } = useSignOutAccount()
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
                    className="h-12 w-12 rounded-full object-cover object-top"/>

                </Link>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
                <DropdownMenuItem>
                <Link to={`/profile/${user.id}`} className="flex gap-4 text-lg px-2 w-full " >
                <img
                    src="/assets/icons/people.svg"
                    alt="logout"
                    />
                    Profile
                </Link>
                </DropdownMenuItem>

                    <DropdownMenuItem>
                    <ThemeToggleButton className={cn("h-4 w-4 px-0")} />

                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                <DropdownMenuItem>
                <Button variant='ghost' className="shad-button_ghost" onClick={() => signOut()}>
                    <img
                    src="/assets/icons/logout.svg"
                    alt="logout"
                    />
                    <p className="text-lg">

                    Logout
                    </p>

                </Button>
                </DropdownMenuItem>
          </DropdownMenuContent>


        </DropdownMenu>
      )
}

export default Navbar
