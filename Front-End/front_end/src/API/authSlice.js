import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authSlice = createApi({
  reducerPath: "apiAuth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "/api/auth/register",
        method: "POST",

        body: user,
      }),
    }),
    login: builder.mutation({
      query: (userdata) => ({
        url: "/api/auth/login",
        method: "POST",

        body: userdata,
      }),
    }),
  }),
});
export const { useRegisterMutation, useLoginMutation } = authSlice;
