import {
  FeedContainer,
  LoginContainer,
  RegisterContainer,
  TaskContainer,
} from "@/containers"
import { AppPath } from "./RouteName"

export type TRouteConfig = {
  path: string
  component: () => JSX.Element
}

const PrivateRoutes: TRouteConfig[] = [
  {
    path: AppPath.tasks,
    component: TaskContainer,
  },
  {
    path: AppPath.feeds,
    component: FeedContainer,
  },
]

const PublicRoutes: TRouteConfig[] = [
  {
    path: AppPath.login,
    component: LoginContainer,
  },
  {
    path: AppPath.register,
    component: RegisterContainer,
  },
]

export { PrivateRoutes, PublicRoutes }
