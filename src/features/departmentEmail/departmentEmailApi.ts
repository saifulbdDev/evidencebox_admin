import { apiSlice } from '@/features/apiSlice';
import {
  setAuthorityDepartmentEmail,
  editDepartmentEmail,
  onDeleteDepartmentEmail,
  onAddDepartmentEmail,
} from './departmentEmailSlice';
export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartmentEmail: builder.query({
      query: () => ({
        url: `authority-department-email`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.data?.authorityDepartmentEmail?.length) {
            dispatch(setAuthorityDepartmentEmail(response?.data?.data?.authorityDepartmentEmail));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),

    addDepartmentEmail: builder.mutation({
      query: (data) => ({
        url: `authority-department-email`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.status === 'success' && response?.data?.data?._id) {
            dispatch(onAddDepartmentEmail(response?.data?.data));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    updateDepartmentEmail: builder.mutation({
      query: (data) => ({
        url: `authority-department-email/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.status === 'success') {
            dispatch(editDepartmentEmail(arg));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    deleteDepartmentEmail: builder.mutation({
      query: (data) => ({
        url: `authority-department-email/${data?._id}`,
        method: 'DELETE',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          console.log(response, arg, 'response');
          if (response?.data?.status === 'success') {
            dispatch(onDeleteDepartmentEmail(arg));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const {
  useDeleteDepartmentEmailMutation,
  useAddDepartmentEmailMutation,
  useUpdateDepartmentEmailMutation,
  useGetDepartmentEmailQuery,
} = userApi;
