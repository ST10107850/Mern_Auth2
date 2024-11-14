import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: " " }), // Replace with actual base URL
  tagTypes: ["User"], // Add any tag types here if you plan to use `invalidatesTags`
  endpoints: () => ({}), // Empty to be injected with additional endpoints
});
