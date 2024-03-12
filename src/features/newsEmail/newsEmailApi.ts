import { apiSlice } from '@/features/apiSlice';
import { setNewsEmail, editNewsEmail, onDeleteNewsEmail, onAddNewsEmail } from './newsEmailSlice';
export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getNewsEmail: builder.query({
      query: () => ({
        url: `news-authority-email`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.data?.newsAuthorityEmail?.length) {
            dispatch(setNewsEmail(response?.data?.data?.newsAuthorityEmail));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
 
    addNewsEmail: builder.mutation({
      query: (data) => ({
        url: `news-authority-email`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          console.log(response, 'response')
          if (response?.data?.status === 'success' && response?.data?.data?._id) {
            dispatch(onAddNewsEmail(response?.data?.data));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    updateNewsEmail: builder.mutation({
      query: (data) => ({
        url: `news-authority-email/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.status === 'success') {
            dispatch(editNewsEmail(arg));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    deleteNewsEmail: builder.mutation({
      query: (data) => ({
        url: `news-authority-email/${data?._id}`,
        method: 'DELETE',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          console.log(response,  arg, 'response');
          if (response?.data?.status === 'success') {
            dispatch(onDeleteNewsEmail(arg));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
   
  }),
});

export const {
  useDeleteNewsEmailMutation,
  useAddNewsEmailMutation,
  useUpdateNewsEmailMutation,
  useGetNewsEmailQuery,


} = userApi;
