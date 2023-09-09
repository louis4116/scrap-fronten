import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const userDataApi = createApi({
  reducerPath: 'userDataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL_API,
  }),
  tagTypes: ['UserData'],
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: ({ token }) => ({
        url: '/user/me',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['UserData'],
    }),
    updatedImg: builder.mutation({
      query: ({ id, token, avatar }) => ({
        url: `/user/uploadImg/${id}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          token,
          avatar,
        },
      }),
      invalidatesTags: ['UserData'],
    }),
    storeNewsToUser: builder.mutation({
      query: ({ id, source, modDate, title, url, img, summary, token }) => ({
        url: `/handleNews/${id}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          user: id,
          date: modDate,
          source,
          title,
          url,
          img,
          summary,
        },
      }),
      invalidatesTags: ['UserData'],
    }),
    deleteNews: builder.mutation({
      query: ({ id, token }) => ({
        url: `/handleNews/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['UserData'],
    }),
    updateMemo: builder.mutation({
      query: ({ memo, newsId, token }) => ({
        url: `/handleNews/${newsId}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          memo,
        },
      }),
      invalidatesTags: ['UserData'],
    }),
  }),
});

export const {
  useGetUserDataQuery,
  useStoreNewsToUserMutation,
  useUpdatedImgMutation,
  useDeleteNewsMutation,
  useUpdateMemoMutation,
} = userDataApi;
