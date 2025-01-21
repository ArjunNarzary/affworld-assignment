import { LayoutComponent } from "@/components"
import { Navigate, Outlet } from "react-router"

type TProtectedRouteProps = {
  isAuthenticated: boolean
  redirectTo: string
}

const ProtectedRoutes = ({
  isAuthenticated,
  redirectTo,
}: TProtectedRouteProps) => {
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
