import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authSlice = createApi({
  reducerPath: "apiAuth",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "/api/auth/register",
        method: "POST",
        body: { user },
      }),
    }),
    login: builder.mutation({
      query: (email, password) => ({
        url: "/api/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
  }),
});
export const { useRegisterMutation, useLoginMutation } = authSlice;
