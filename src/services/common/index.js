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
    getRetailerForSupplier: builder.mutation({
      query: (task) => {
        const token = localStorage.getItem("authToken");

        return {
          url: "/api_getRetailersForSupplier",
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: task,
        };
      },
    }),
    getInventoryForRetailerBySupplier: builder.mutation({
      query: (task) => {
        const token = localStorage.getItem("authToken");

        return {
          url: "/api_getInventoryForRetailerBySupplier",
          method: "POST",
          body: task,
        };
      },
    }),
    getDriverDetails: builder.mutation({
      query: (task) => {
        return {
          url: "/api_get_drivers",
          method: "POST",
          body: task,
        };
      },
    }),
    getRetailerInventory: builder.mutation({
      query: (task) => {
        return {
          url: "/api_getInventory",
          method: "POST",
          body: task,
        };
      },
    }),
    postProductReqRetailer: builder.mutation({
      query: (task) => {
        return {
          url: "/api_productRequests",
          method: "POST",
          body: task,
        };
      },
    }),
    getProductReqSupplier: builder.mutation({
      query: (task) => {
        return {
          url: "/api_SeeProductRequests",
          method: "POST",
          body: task,
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetRetailerForSupplierMutation,
  useGetInventoryForRetailerBySupplierMutation,
  useGetDriverDetailsMutation,
  useGetRetailerInventoryMutation,
  usePostProductReqRetailerMutation,
  useGetProductReqSupplierMutation,
} = apiSlice;
export default apiSlice;
