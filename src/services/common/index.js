import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (task) => ({
        url: "/api_registration",
        method: "POST",
        body: task,
      }),
    }),
    loginUser: builder.mutation({
      query: (task) => ({
        url: "/api_login",
        method: "POST",
        body: task,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = apiSlice;
export default apiSlice;
