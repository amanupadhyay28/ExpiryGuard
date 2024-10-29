// src/features/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import store from "../../Redux/store/store";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://your-api-url.com" }),
  endpoints: (builder) => ({
    fetchItems: builder.query({
      query: () => "/items",
    }),
  }),
});

export const { useFetchItemsQuery } = api;
