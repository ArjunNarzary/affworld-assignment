import {
  IAddTaskPayload,
  IDefaultResponse,
  ITask,
  ITaskResponse,
  IUpdateTaskResponse,
} from "@/interfaces"
import { API_ENDPOINTS } from "../apiEndpoints"
import { apiSlice } from "../apiSlice"

export const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTask: builder.mutation<ITaskResponse, IAddTaskPayload>({
      query: (body: IAddTaskPayload) => ({
        url: API_ENDPOINTS.task.addGet,
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: ["Task"],
    }),

    getAllTask: builder.query<ITaskResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.task.addGet,
        method: "GET",
      }),
      providesTags: ["Task"],
    }),

    updateTask: builder.mutation<IUpdateTaskResponse, ITask>({
      query: (body: ITask) => ({
        url: API_ENDPOINTS.task.deleteUpdateTask(body._id),
        method: "PUT",
        body: { ...body },
      }),
      invalidatesTags: ["Task"],
    }),

    deleteTask: builder.mutation<IDefaultResponse, string>({
      query: (id: string) => ({
        url: API_ENDPOINTS.task.deleteUpdateTask(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
})

export const {
  useAddTaskMutation,
  useGetAllTaskQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = authService
