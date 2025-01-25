import {
  FeedContainer,
  LoginContainer,
  RegisterContainer,
  TaskContainer,
} from "@/containers"
import { AppPath } from "./RouteName"

export interface IRouteConfig {
  path: string
  component: () => JSX.Element
}

const PrivateRoutes: IRouteConfig[] = [
  {
    path: AppPath.tasks,
    component: TaskContainer,
  },
  {
    path: AppPath.feeds,
    component: FeedContainer,
  },
]

const PublicRoutes: IRouteConfig[] = [
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
