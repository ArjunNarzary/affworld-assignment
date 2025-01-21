import { Route, Routes } from "react-router"
import "./App.css"
import { PublicRoutes, TRouteConfig } from "./routes/RouteConfig"
import { AppPath, PrivateRoutes, ProtectedRoutes } from "./routes"

function App() {
  const renderRoutes = (routes: TRouteConfig[]) => {
    return routes.map((route: TRouteConfig) => {
      const { path, component: Component } = route
      return <Route key={path} path={path} element={<Component />} />
    })
  }
  return (
    <>
      <Routes>
        <>
          <Route
            element={
              <ProtectedRoutes
                isAuthenticated={true}
                redirectTo={AppPath.login}
              />
            }
          >
            {renderRoutes(PrivateRoutes)}
          </Route>
          {renderRoutes(PublicRoutes)}
        </>
      </Routes>
    </>
  )
}

export default App
