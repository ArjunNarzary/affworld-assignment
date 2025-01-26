import { IDefaultResponse, IFeedsResponse } from "@/interfaces"
import { API_ENDPOINTS } from "../apiEndpoints"
import { apiSlice } from "../apiSlice"

export const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFeed: builder.mutation<IDefaultResponse, FormData>({
      query: (body: FormData) => ({
        url: API_ENDPOINTS.feed.addGetFeed,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Feeds"],
    }),

    getAllFeeds: builder.query<IFeedsResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.feed.addGetFeed,
        method: "GET",
      }),
      providesTags: ["Feeds"],
    }),
  }),
})

export const { useCreateFeedMutation, useGetAllFeedsQuery } = authService
