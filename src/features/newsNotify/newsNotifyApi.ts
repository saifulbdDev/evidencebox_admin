import { apiSlice } from '@/features/apiSlice';
import { setNewsNotify, editNewsNotify, onDeleteNewsNotify, onAddNewsNotify } from './newsNotifySlice';
export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getNewsNotify: builder.query({
      query: () => ({
        url: `news-to-notify`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.data?.newsToNotify?.length) {
            dispatch(setNewsNotify(response?.data?.data?.newsToNotify));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
 
    addNewsNotify: builder.mutation({
      query: (data) => ({
        url: `news-to-notify`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.status === 'success' && response?.data?.data._id) {
            dispatch(onAddNewsNotify(response?.data?.data));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    updateNewsNotify: builder.mutation({
      query: (data) => ({
        url: `news-to-notify/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.status === 'success') {
            dispatch(editNewsNotify(arg));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    deleteNewsNotify: builder.mutation({
      query: (data) => ({
        url: `news-to-notify/${data?._id}`,
        method: 'DELETE',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          console.log(response,  arg, 'response');
          if (response?.data?.status === 'success') {
            dispatch(onDeleteNewsNotify(arg));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
   
  }),
});

export const {
  useDeleteNewsNotifyMutation,
  useAddNewsNotifyMutation,
  useUpdateNewsNotifyMutation,
  useGetNewsNotifyQuery,


} = userApi;
