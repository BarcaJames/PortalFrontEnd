import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { toast } from "react-toastify";

const axiosBaseQuery =
  ({ baseUrl }) =>
  async ({ url, method, data }) => {
    try {
      let requestToken = localStorage.getItem("token");
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        headers: requestToken
          ? { Authorization: "Bearer " + requestToken }
          : null,
      });
      var token = "";
      // Get token from header when user login successfully
      if (method.toUpperCase() === "POST" && url === "/login") {
        token = result?.headers?.["jwt-token"];
      }

      if (token !== "") {
        result.data = { ...result.data, token };
      }

      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:8080/user" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({ url: "/list", method: "get" }),
      providesTags: ["User"],
    }),

    loginUser: builder.query({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        data: userData,
      }),
      transformResponse: (response) => {
        // console.log("RESPONSE loginUser--->", response);
        return response;
      },
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, getCacheEntry }
      ) {
        let responseData = await queryFulfilled.catch((err) => err);
        if (responseData?.error) {
          let { data } = responseData.error;
          // console.log("Error Data", data);
          toast.error(data.message.toLowerCase());
        }
        // console.log("RESPONSE DATA in loginUser---> ", responseData);

        if (responseData?.data) {
          let {
            data: { token, firstName },
          } = responseData;
          // console.log(token);
          localStorage.setItem("token", token);
          toast.success(`Welcome ${firstName}`);
        }
      },
    }),

    addUser: builder.mutation({
      query: (formData) => ({ url: `/add`, method: "post", data: formData }),
      invalidatesTags: ["User"],
      transformResponse: (response) => {
        // console.log("RESPONSE ADD USER--->", response);
        return response;
      },
    }),

    updateUser: builder.mutation({
      query: (formData) => ({ url: `/update`, method: "post", data: formData }),
      invalidatesTags: ["User"],
      transformResponse: (response) => {
        // console.log("RESPONSE UPDATE USER--->", response);
        return response;
      },
    }),

    updateProfileImage: builder.mutation({
      query: (formData) => ({
        url: `/update-profile-Image`,
        method: "post",
        data: formData,
      }),
      transformResponse: (response) => {
        // console.log("RESPONSE UPDATE USER PROFILE IMAGE--->", response);
        return response;
      },
    }),

    deleteUser: builder.mutation({
      query: (username) => ({ url: `/delete/${username}`, method: "delete" }),
      invalidatesTags: ["User"],
      transformResponse: (response) => {
        // console.log("USER DELETED TRANSFORM--->", response);
        return response;
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        let responseData = await queryFulfilled.catch((err) => err.data);
        // console.log("queryFulfilled USER DELETED ---> ", responseData);
        if (responseData?.data === "") {
          // console.log("RESPONSE DATA IN queryFulfilled is empty");
          toast.success("User deleted successfully!");
        }
      },
    }),

    resetPassword: builder.query({
      query: (email) => ({ url: `/reset-password/${email}`, method: "post" }),
      transformResponse: (response) => {
        // console.log("RESPONSE Reset Email--->", response);
        return response;
      },
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, getCacheEntry }
      ) {
        let responseData = await queryFulfilled.catch((err) => err);

        // console.log("RESPONSE DATA in Reset Password---> ", responseData);

        if (responseData?.error) {
          let { data } = responseData.error;
          // console.log("Error Data", data);
          toast.error(data.message.toLowerCase());
        }
        // console.log("RESPONSE DATA in loginUser---> ", responseData);

        if (responseData?.data) {
          let {
            data: { message },
          } = responseData;
          // console.log(token);
          toast.success(message.toLowerCase());
        }
      },
    }),

    getCurrentUser: builder.query({
      query: (username) => ({ url: `/find/${username}`, method: "get" }),
      providesTags: ["User"],
      transformResponse: (response) => {
        // console.log("RESPONSE getCurrentUser--->", response);
        return response;
      },
      // async onQueryStarted(
      //   arg,
      //   { dispatch, getState, queryFulfilled, requestId, getCacheEntry }
      // ) {
      //   let responseData = await queryFulfilled.catch((err) => err.data);
      //   console.log("queryFulfilled getCurrentUser ---> ", responseData);
      //   if (responseData?.data === "") {
      //     console.log("The user in the token is not in the database");
      //     localStorage.removeItem("token");
      //   }
      //   console.log("GET STATE", getState());
      //   console.log("GET CATCH ENTRY", getCacheEntry());
      // },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllUsersQuery,
  useLazyLoginUserQuery,
  useLazyGetCurrentUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUpdateProfileImageMutation,
  useLazyResetPasswordQuery,
} = userApi;
