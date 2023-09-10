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
    getLtnNews: builder.query<News<NewsShape>, { id: string | undefined }>({
      query: ({ id }) => ({
        url: `/news/ltn/${id}`,
      }),
    }),
    getLtnMilitary: builder.query<News<NewsShape>, { id: string | undefined }>({
      query: ({ id }) => ({
        url: `/news/ltn/ltn-military/${id}`,
      }),
    }),
    getCnaNews: builder.query<News<NewsShape>, { id: string | undefined }>({
      query: ({ id }) => ({
        url: `/news/cna/${id}`,
      }),
    }),
    getUdnNews: builder.query<News<NewsShape>, { id: string | undefined }>({
      query: ({ id }) => ({
        url: `/news/udn/${id}`,
      }),
    }),
  }),
});

export const {
  useGetLtnNewsQuery,
  useGetLtnMilitaryQuery,
  useGetCnaNewsQuery,
  useGetUdnNewsQuery,
} = newsApi;
