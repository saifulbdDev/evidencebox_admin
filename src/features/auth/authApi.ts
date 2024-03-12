import { apiSlice } from '@/features/apiSlice';
import { logout, loggedIn } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStaticData: builder.query({
      query: () => {
        return {
          url: `police-portal-static-data`,
          method: 'GET',
        };
      },
    }),
    userSearch: builder.mutation({
      query: (data) => {
        return {
          url: `find-user`,
          method: 'POST',
          body: data,
        };
      },
    }),

    getProfile: builder.query({
      query: () => {
        return {
          url: `auth/profile`,
          method: 'GET',
        };
      },
    }),
    updateProfile: builder.mutation({
      query: () => {
        return {
          url: `auth/profile`,
          method: 'PUT',
          formData: true,        
          headers: {
            "content-type": "multipart/form-data"
          },
        };
      },
    }),

    login: builder.mutation({
      query: (data) => ({
        url: `auth/signin-admin`,
        method: 'POST',
        body: data,
      }),    
    }),
    verifyLogin: builder.mutation({
      query: (data) => ({
        url: `auth/admin-signin-verify`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.data?.accessToken) {
            dispatch(loggedIn(response?.data?.data?.accessToken));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: `auth/logout`,
        method: 'POST',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 'success') {
            dispatch(logout());
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          url: `auth/forgot-password`,
          method: 'POST',
          body: data,
        };
      },
    }),
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: `auth/change-password`,
          method: 'PUT',
          body: data,
        };
      },
    }),
    verifyOtp: builder.mutation({
      query: (data) => {
        return {
          url: `auth/verify-otp`,
          method: 'POST',
          body: data,
        }
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: `auth/reset-password`,
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useResetPasswordMutation,
  useVerifyOtpMutation,  
  useGetStaticDataQuery,
  useUserSearchMutation,
  useChangePasswordMutation,
  useLoginMutation,
  useVerifyLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useForgotPasswordMutation,
  useLogoutMutation,
} = authApi;
