import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tasksSlice = createApi({
  reducerPath: "tasks_api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include",
  }),
  tagTypes: ["tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/api/tasks",
      providesTags: ["tasks"],
    }),
  }),
});
export const { useGetTasksQuery } = tasksSlice;
