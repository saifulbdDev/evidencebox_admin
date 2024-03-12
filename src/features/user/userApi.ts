import { apiSlice } from '@/features/apiSlice';
import {
  getPlans,
  editPlan,
  onDeletePlan,
  planAdd,
  setPolice,
  setFileAccess,
  updatePoliceVerify,
  updateFileAccess,
  softDeletePolice,
  restorePolice,
  suspendPolice,
  permanentDeletePolice,
  softDeleteUser,
  restoreUser,
  suspendUser,
  permanentDeleteUser,
  setUsers,
} from './userSlice';
export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPreviousHistory: builder.query({
      query: () => {
        return {
          url: `user-file-access-previous-history`,
          method: 'GET',
        };
      },
    }),
    getEvidenceData: builder.query({
      query: () => {
        return {
          url: `all-evidence-data`,
          method: 'GET',
        };
      },
    }),
    getEvidenceSingleData: builder.query({
      query: (data) => {
        return {
          url: `get-single-evidence-data`,
          method: 'POST',
          body: data,
        };
      },
    }),
    getUsers: builder.query({
      query: () => ({
        url: `all-users`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.data?.length) {
            dispatch(setUsers(response?.data?.data));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    userAction: builder.mutation({
      query: (data) => ({
        url: `user-action`,
        method: 'POST',
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.status === 'success' && response?.data?.data._id) {
            if (arg.type == 'delete') {
              dispatch(softDeleteUser(response?.data?.data));
            } else if (arg.type == 'restore') {
              dispatch(restoreUser(response?.data?.data));
            } else if (arg.type == 'suspend') {
              dispatch(suspendUser(response?.data?.data));
            } else if (arg.type == 'delete-permanently') {
              dispatch(permanentDeleteUser(response?.data?.data));
            }
          }
        } catch (err) {
          // do nothing
        
        }
      },
    }),
    getDeletedAccounts: builder.query({
      query: () => {
        return {
          url: `deleted-accounts`,
          method: 'GET',
        };
      },
    }),
    getPolice: builder.query({
      query: () => ({
        url: `all-polices`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.data?.length) {
            dispatch(setPolice(response?.data?.data));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    policeAction: builder.mutation({
      query: (data) => ({
        url: `police-action`,
        method: 'POST',
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // fetch police data
        // this.query.userApi.getPolice();
        try {
          const response = await queryFulfilled;
        
          if (response?.data?.status === 'success' && response?.data?.data._id) {
            if (arg.type == 'file-access-approve' || arg.type == 'file-access-reject') {
              dispatch(updateFileAccess(response?.data?.data));
            } else if (
              arg.type == 'account-verify-approve' ||
              arg.type == 'account-verify-reject'
            ) {
              dispatch(updatePoliceVerify(response?.data?.data));
            } else if (arg.type == 'delete') {
              dispatch(softDeletePolice(response?.data?.data));
            } else if (arg.type == 'restore') {
              dispatch(restorePolice(response?.data?.data));
            } else if (arg.type == 'suspend') {
              dispatch(suspendPolice(response?.data?.data));
            } else if (arg.type == 'delete-permanently') {
              dispatch(permanentDeletePolice(response?.data?.data));
            }
          }
        } catch (err) {
          // do nothing
         
        }
      },
    }),
    getFileAccess: builder.query({
      query: () => ({
        url: `all-users-file-access-request-list`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.data?.length) {
            dispatch(setFileAccess(response?.data?.data));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    getPayments: builder.query({
      query: () => {
        return {
          url: `subscription/get-all-list`,
          method: 'GET',
        };
      },
    }),
    addPlan: builder.mutation({
      query: (data) => ({
        url: `plan`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.status === 'success' && response?.data?.data.id) {
            dispatch(planAdd(response?.data?.data));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    updatePlan: builder.mutation({
      query: (data) => ({
        url: `plan/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.status === 'success') {
            dispatch(editPlan(arg));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    deletePlan: builder.mutation({
      query: (data) => ({
        url: `plan/${data.id}`,
        method: 'DELETE',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

        
          if (response?.data?.status === 'success') {
            dispatch(onDeletePlan(arg));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    getPlans: builder.query({
      query: () => ({
        url: `plan`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response?.data?.data?.plans?.length) {
            dispatch(getPlans(response?.data?.data?.plans));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const {
  useGetEvidenceDataQuery,
  useGetEvidenceSingleDataQuery,
  useDeletePlanMutation,
  useAddPlanMutation,
  useUpdatePlanMutation,
  useGetPlansQuery,
  useGetPreviousHistoryQuery,
  useGetPaymentsQuery,
  useGetUsersQuery,
  useUserActionMutation,
  useGetDeletedAccountsQuery,
  useGetPoliceQuery,
  usePoliceActionMutation,
  useGetFileAccessQuery,
} = userApi;
