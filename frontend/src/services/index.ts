import {
  useRegisterUserMutation,
  useLogoutUserMutation,
  useLoginUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGoogleLoginMutation,
} from "./auth/authService"

import {
  useAddTaskMutation,
  useGetAllTaskQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "./task/taskService"

import { useCreateFeedMutation, useGetAllFeedsQuery } from "./feed/feedService"

export {
  useRegisterUserMutation,
  useLogoutUserMutation,
  useLoginUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGoogleLoginMutation,
  useAddTaskMutation,
  useGetAllTaskQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useCreateFeedMutation,
  useGetAllFeedsQuery,
}
