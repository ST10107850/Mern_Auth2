import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const productBaseQuery = fetchBaseQuery({baseUrl: " "});


export const productSlice = createApi({
    productBaseQuery,
    tagTypes: ["Product"],
    endpoints: () => ({})
});
