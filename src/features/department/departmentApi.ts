import { apiSlice } from '@/features/apiSlice';
import {
  setAuthorityNotifys,
  setHowItWorks,
  editAuthorityNotify,
  onDeleteAuthorityNotify,
  onAddAuthorityNotify,
} from './departmentSlice';
export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHowItWorks: builder.query({
      query: () => ({
        url: `how-it-works`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          dispatch(setHowItWorks(response?.data?.data));
        } catch (err) {
          // do nothing
        }
      },
    }),
    getAuthorityNotify: builder.query({
      query: () => ({
        url: `authority-to-notify`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.data?.length) {
            dispatch(setAuthorityNotifys(response?.data?.data));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),

    addAuthorityNotify: builder.mutation({
      query: (data) => ({
        url: `authority-to-notify`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.status === 'success' && response?.data?.data.id) {
            dispatch(onAddAuthorityNotify(response?.data?.data));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    updateAuthorityNotify: builder.mutation({
      query: (data) => ({
        url: `authority-to-notify/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.status === 'success') {
            dispatch(editAuthorityNotify(arg));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    deleteAuthorityNotify: builder.mutation({
      query: (data) => ({
        url: `authority-to-notify/${data?._id}`,
        method: 'DELETE',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

         
          if (response?.data?.status === 'success') {
            dispatch(onDeleteAuthorityNotify(arg));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    deleteHowItWorks: builder.mutation({
      query: () => ({
        url: `how-it-works`,
        method: 'DELETE',
       
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

       
          if (response?.data?.status === 'success') {
               /* @ts-ignore */
            dispatch(setHowItWorks({}));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const {
  useDeleteHowItWorksMutation,
  useDeleteAuthorityNotifyMutation,
  useAddAuthorityNotifyMutation,
  useUpdateAuthorityNotifyMutation,
  useGetAuthorityNotifyQuery,
  useGetHowItWorksQuery,
} = userApi;
