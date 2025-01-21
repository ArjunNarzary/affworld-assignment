import { AppPath } from "@/routes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import { ReactNode } from "react"
import { useNavigate } from "react-router"

const LayoutComponent = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    navigate(AppPath.login, { replace: true })
  }
  return (
    <main className="flex flex-col min-h-screen w-full container mx-auto">
      <header className="flex flex-row justify-between items-center py-10">
        <div>
          <h1 className="text-3xl font-extrabold">Task Management Tool</h1>
        </div>
        <div className="flex flex-row gap-x-3 justify-end items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>Arjun</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1">{children}</main>

      <footer className="flex justify-center py-4">
        All right reserver &copy; 2024
      </footer>
    </main>
  )
}

export default LayoutComponent
