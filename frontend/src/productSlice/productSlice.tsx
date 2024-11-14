import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a type for your tags
type ProductTag = "Product";

const productBaseQuery = fetchBaseQuery({ baseUrl: " " });

export const productSlice = createApi({
  reducerPath: "productApi", // Add a reducerPath to the API configuration
  baseQuery: productBaseQuery,
  tagTypes: ["Product"] as ProductTag[],  // Type the tagTypes property explicitly
  endpoints: () => ({}),
});
