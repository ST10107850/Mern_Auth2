import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/users";

export const UserApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: { email, password },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ name, surname, email }) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: { name, surname, email },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation, // Corrected export
} = UserApiSlice;
