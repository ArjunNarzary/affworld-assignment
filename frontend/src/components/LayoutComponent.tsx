import { AppPath } from "@/routes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import { ReactNode } from "react"
import { useNavigate } from "react-router"
import Navbar from "./Navbar"
import { useDispatch, useSelector } from "react-redux"
import { logOut, selectUser } from "@/services/auth/authSlice"
import { useLogoutUserMutation } from "@/services"

const LayoutComponent = ({ children }: { children: ReactNode }) => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [logoutUser] = useLogoutUserMutation()
  const navigate = useNavigate()
  const avatarName = user?.name
    ? (user?.name[0] + user?.name[1]).toUpperCase()
    : "0"

  const handleLogout = async () => {
    await logoutUser()
    dispatch(logOut())
    navigate(AppPath.login, { replace: true })
  }

  return (
    <main className="flex flex-col min-h-screen w-full container mx-auto">
      <header className="flex flex-row justify-between items-center py-10">
        <div className="flex justify-start items-center gap-4">
          <h1 className="text-3xl font-extrabold">Task Management Tool</h1>
          <Navbar />
        </div>
        <div className="flex flex-row gap-x-3 justify-end items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="bg-redPurple h-10 w-10 rounded-full flex justify-center items-center">
                <span className="text-lightGrey font-semibold">
                  {avatarName}
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="m-2">
              <DropdownMenuItem
                className="border-[0.1rem] rounded-sm cursor-pointer px-4 border-darkViolet"
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1">{children}</main>

      <footer className="flex justify-center py-4">
        All right reserve &copy; 2025
      </footer>
    </main>
  )
}

export default LayoutComponent
