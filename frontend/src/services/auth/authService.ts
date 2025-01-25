import {
  IDefaultResponse,
  ILoginPayload,
  ILoginResponse,
  IRegisterPayload,
} from "@/interfaces"
import { API_ENDPOINTS } from "../apiEndpoints"
import { apiSlice } from "../apiSlice"

export const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<ILoginResponse, IRegisterPayload>({
      query: (credentials: IRegisterPayload) => ({
        url: API_ENDPOINTS.auth.register,
        method: "POST",
        body: { ...credentials },
      }),
    }),

    loginUser: builder.mutation<ILoginResponse, ILoginPayload>({
      query: (credentials: IRegisterPayload) => ({
        url: API_ENDPOINTS.auth.login,
        method: "POST",
        body: { ...credentials },
      }),
    }),

    logoutUser: builder.mutation<IDefaultResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.auth.logout,
        method: "PUT",
      }),
    }),
  }),
})

export const {
  useRegisterUserMutation,
  useLogoutUserMutation,
  useLoginUserMutation,
} = authService
