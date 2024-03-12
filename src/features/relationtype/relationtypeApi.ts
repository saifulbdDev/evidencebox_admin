import { apiSlice } from '@/features/apiSlice';
import { setRelationTypes, editRelationType, onDeleteRelationType, onAddRelationType } from './relationtypeSlice';
export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    getRelationType: builder.query({
      query: () => ({
        url: `relation-type`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          console.log(response?.data?.data, 'response?.data?.data')
          if (response?.data?.data?.length) {
            dispatch(setRelationTypes(response?.data?.data));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
 
    addRelationType: builder.mutation({
      query: (data) => ({
        url: `relation-type`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.status === 'success' && response?.data?.data.id) {
            dispatch(onAddRelationType(response?.data?.data));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    updateRelationType: builder.mutation({
      query: (data) => ({
        url: `relation-type/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.status === 'success') {
            dispatch(editRelationType(arg));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    deleteRelationType: builder.mutation({
      query: (data) => ({
        url: `relation-type/${data?._id}`,
        method: 'DELETE',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          console.log(response,  arg, 'response');
          if (response?.data?.status === 'success') {
            dispatch(onDeleteRelationType(arg));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
   
  }),
});

export const {
  useDeleteRelationTypeMutation,
  useAddRelationTypeMutation,
  useUpdateRelationTypeMutation,
  useGetRelationTypeQuery,
 

} = userApi;
