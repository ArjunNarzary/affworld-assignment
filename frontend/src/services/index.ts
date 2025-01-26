import {
  useRegisterUserMutation,
  useLogoutUserMutation,
  useLoginUserMutation,
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
  useAddTaskMutation,
  useGetAllTaskQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useCreateFeedMutation,
  useGetAllFeedsQuery,
}
