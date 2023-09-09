import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

interface LoginStatus {
  token: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL_API,
  }),
  tagTypes: ['NewsData'],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: ({ name, email, password }) => ({
        url: '/user/register',
        method: 'POST',
        body: {
          name,
          email,
          password,
        },
      }),
    }),
    signIn: builder.mutation({
      query: ({ email, password }) => ({
        url: '/user/login',
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
      transformResponse: (response: LoginStatus) => response,
    }),
    resetPassword: builder.mutation({
      query: ({ token, id, oldPassword, newPassword }) => ({
        url: `/user/loginUserReset/${id}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          oldPassword,
          newPassword,
        },
      }),
    }),

    resetEmail: builder.mutation({
      query: ({ email }) => ({
        url: '/user/forgetPassword',
        method: 'POST',
        body: {
          email,
        },
      }),
    }),
    resetPasswordFromEmail: builder.mutation({
      query: ({ id, newPassword, newPasswordConfirm }) => ({
        url: `/user/resetPassword/${id}`,
        method: 'PATCH',
        body: {
          password: newPassword,
          passwordConfirm: newPasswordConfirm,
        },
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useResetEmailMutation,
  useResetPasswordMutation,
  useResetPasswordFromEmailMutation,
} = authApi;
