import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL =
  import.meta.env.MODE === 'development'
    ? `${import.meta.env.VITE_DEV_API_URL}/auth`
    : `${import.meta.env.VITE_PROD_API_URL}/auth`

export const authApis = createApi({
  reducerPath: 'authApis',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
    }),
    userLogin: builder.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
    }),
    googleAuth: builder.mutation({
      query: (user) => ({
        url: "/googleAuth",
        method: "POST",
        body: user,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "/getuser",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("_token")}`,
        },
      }),
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useGoogleAuthMutation,
  useGetUserQuery,
} = authApis;
