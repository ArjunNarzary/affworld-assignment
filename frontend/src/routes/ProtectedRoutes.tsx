import { LayoutComponent } from "@/components"
import { Navigate, Outlet } from "react-router"

interface IProtectedRouteProps {
  isAuthenticated: boolean
  redirectTo: string
}

const ProtectedRoutes = ({
  isAuthenticated,
  redirectTo,
}: IProtectedRouteProps) => {
  if (isAuthenticated) {
    return (
      <LayoutComponent>
        <Outlet />
      </LayoutComponent>
    )
  }

  return <Navigate to={redirectTo} replace />
}

export default ProtectedRoutes
