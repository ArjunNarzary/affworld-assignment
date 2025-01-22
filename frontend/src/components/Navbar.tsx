import { cn } from "@/lib/utils"
import { AppPath } from "@/routes"
import { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router"

interface IPath {
  key: string
  label: string
  link: string
  isActive: boolean
}

const PATHS: IPath[] = [
  {
    key: "task",
    label: "Tasks",
    link: AppPath.tasks,
    isActive: false,
  },
  {
    key: "feed",
    label: "Feeds",
    link: AppPath.feeds,
    isActive: false,
  },
]

const Navbar = () => {
  const { pathname } = useLocation()
  const [paths, setPaths] = useState(PATHS)

  useEffect(() => {
    setPaths((prev: IPath[]) => {
      return prev.map((path) => {
        return {
          ...path,
          isActive: path.link === pathname,
        }
      })
    })
  }, [pathname])

  return (
    <section className="flex justify-start items-center gap-[0.1rem] border-2 py-[0.3rem] px-2 rounded-2xl">
      {paths.map((path, index) => (
        <NavLink key={path.key} to={path.link}>
          <div
            className={cn(
              "py-[0.2rem] px-6 hover:bg-gray-100 text-darkBlue",
              index === 0 ? "rounded-l-xl" : "rounded-r-xl",
              {
                "bg-semiDarkBlue text-lightGrey hover:bg-darkViolet ":
                  path.isActive,
              }
            )}
          >
            {path.label}
          </div>
        </NavLink>
      ))}
    </section>
  )
}

export default Navbar
