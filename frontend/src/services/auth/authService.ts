import {
  IDefaultResponse,
  IForgetPasswordResponse,
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

    forgetPassword: builder.mutation<
      IForgetPasswordResponse,
      { email: string }
    >({
      query: (body: { email: string }) => ({
        url: API_ENDPOINTS.auth.forgetPassword,
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation<
      IDefaultResponse,
      { password: string; token: string }
    >({
      query: (body: { password: string; token: string }) => ({
        url: API_ENDPOINTS.auth.resetPassword,
        method: "POST",
        body,
      }),
    }),

    googleLogin: builder.mutation<ILoginResponse, { code: string }>({
      query: (body: { code: string }) => ({
        url: API_ENDPOINTS.auth.googleLogin,
        method: "POST",
        body,
      }),
    }),
  }),
})

export const {
  useRegisterUserMutation,
  useLogoutUserMutation,
  useLoginUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGoogleLoginMutation,
} = authService
