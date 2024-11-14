import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../types/State";

const PRODUCT_URL = "/api/products"; // Replace with your actual endpoint

// Base URL configuration for your API
const productBaseQuery = fetchBaseQuery({ baseUrl: " " }); // Replace with your actual backend base URL

export const productSlice = createApi({
  reducerPath: "productApi",
  baseQuery: productBaseQuery,
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getAllProduct: builder.query<Product[], void>({
      query: () => 'products',
    }),    
    createProduct: builder.mutation({
      query: (data) => ({
        url: PRODUCT_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (id) => `${PRODUCT_URL}/${id}`, // Prefix the ID with PRODUCT_URL
      providesTags: (id) => [{ type: "Product", id }],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useCreateProductMutation,
  useGetProductByIdQuery,
} = productSlice;
