import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface News<T> {
  data: T[];
}

export const newsApi = createApi({
  reducerPath: 'newsAspi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL_API,
  }),
  endpoints: (builder) => ({
    getNews: builder.query<
      News<NewsShape>,
      { id: string | undefined; backPath: string | undefined }
    >({
      query: ({ id, backPath }) => ({
        url: `/news/${backPath}/${id}`,
      }),
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
