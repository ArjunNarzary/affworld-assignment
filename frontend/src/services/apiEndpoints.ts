export const API_ENDPOINTS = {
  auth: {
    login: "/user/login",
    register: "/user/register",
    refreshToken: "/user/refresh-token",
    logout: "/user/logout",
  },
  task: {
    addGet: "/task",
    deleteUpdateTask: (id: string) => `/task/${id}`,
  },
  feed: {
    addGetFeed: "/feed",
  },
}
