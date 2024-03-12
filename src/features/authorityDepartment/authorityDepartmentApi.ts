import { apiSlice } from '@/features/apiSlice';
import {
  setAthorityStates,
  editAuthorityDepartment,
  onDeleteAuthorityDepartment,
  onAddaAthorityState,
} from './authorityDepartmentSlice';
export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthorityDepartment: builder.query({
      query: () => ({
        url: `authority-department`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.data?.authorityDepartment?.length) {
            dispatch(setAthorityStates(response?.data?.data?.authorityDepartment));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),

    addAuthorityDepartment: builder.mutation({
      query: (data) => ({
        url: `authority-department`,
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
    updateAuthorityDepartment: builder.mutation({
      query: (data) => ({
        url: `authority-department/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.status === 'success') {
            dispatch(editAuthorityDepartment(arg));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    deleteAuthorityDepartment: builder.mutation({
      query: (data) => ({
        url: `authority-department/${data?._id}`,
        method: 'DELETE',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          console.log(response, arg, 'response');
          if (response?.data?.status === 'success') {
            dispatch(onDeleteAuthorityDepartment(arg));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const {
  useDeleteAuthorityDepartmentMutation,
  useAddAuthorityDepartmentMutation,
  useUpdateAuthorityDepartmentMutation,
  useGetAuthorityDepartmentQuery,
} = userApi;
