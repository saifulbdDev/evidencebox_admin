import { apiSlice } from '@/features/apiSlice';
import { setAthorityStates, editAuthorityState, onDeleteAuthorityState, onAddaAthorityState } from './authorityStateSlice';
export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getAuthorityState: builder.query({
      query: () => ({
        url: `authority-state`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.data?.authorityState?.length) {
            dispatch(setAthorityStates(response?.data?.data?.authorityState));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
 
    addAuthorityState: builder.mutation({
      query: (data) => ({
        url: `authority-state`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.status === 'success' && response?.data?.data.id) {
            dispatch(onAddaAthorityState(response?.data?.data));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    updateAuthorityState: builder.mutation({
      query: (data) => ({
        url: `authority-state/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.status === 'success') {
            dispatch(editAuthorityState(arg));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    deleteAuthorityState: builder.mutation({
      query: (data) => ({
        url: `authority-state/${data?._id}`,
        method: 'DELETE',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          console.log(response,  arg, 'response');
          if (response?.data?.status === 'success') {
            dispatch(onDeleteAuthorityState(arg));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
   
  }),
});

export const {
  useDeleteAuthorityStateMutation,
  useAddAuthorityStateMutation,
  useUpdateAuthorityStateMutation,
  useGetAuthorityStateQuery,


} = userApi;
