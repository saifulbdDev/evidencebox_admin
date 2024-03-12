import { apiSlice } from '@/features/apiSlice';
import { setRelativess, deleteRelatives } from './relativesSlice';
export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRelatives: builder.query({
      query: () => ({
        url: `all-relatives`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          if (response?.data?.data?.relatives?.length) {
            dispatch(setRelativess(response?.data?.data?.relatives));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),

    deleteRelatives: builder.mutation({
      query: (data) => ({
        url: `delete-relative/${data?.id}`,
        method: 'DELETE',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          if (response?.data?.status === 'success') {
            dispatch(deleteRelatives(arg));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const { useDeleteRelativesMutation, useGetRelativesQuery } = userApi;
