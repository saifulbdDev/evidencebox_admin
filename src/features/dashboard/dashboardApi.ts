import { apiSlice } from '@/features/apiSlice';
import {
  setUserOverview,
  setPoliceOverview,
  setEvidenceOverview,
  setRelativeOverview,
  setIncomeOverview,
  setPlanOverview,
} from './dashboardSlice';
export const statisticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStatistics: builder.query({
      query: () => ({
        url: `statistics`,
        method: 'GET',
      }),
    }),
    getLatestUsers: builder.query({
      query: () => ({
        url: `latest-users`,
        method: 'GET',
      }),
    }),

    getUserOverview: builder.mutation({
      query: (data) => ({
        url: `dashboard-user-overview`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          if (response.data.status === 'success') {
            let user = response?.data?.data?.user;
            let userCard = {
              title: 'user',
              totalItems: user?.total || 0,
              newItems: user?.new,
              items: [
                { title: 'Total Registered User', value: user?.registered || 0 },
                { title: 'Total Deleted User', value: user?.deleted || 0 },
                { title: 'Total Suspended User', value: user?.suspended || 0 },
                { title: 'Total Alive User', value: user?.alive || 0 },
                { title: 'Total Dead User', value: user?.dead || 0 },
              ],
            };

            dispatch(setUserOverview(userCard));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),

    getPoliceOverview: builder.mutation({
      query: (data) => ({
        url: `dashboard-police-overview`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          if (response.data.status === 'success') {
            let police = response?.data?.data?.police;
            let policeCard = {
              title: 'police',
              totalItems: police?.total || 0,
              newItems: police?.new || 0,
              items: [
                { title: 'Total Pending Police Request', value: police?.accountPending || 0 },
                { title: 'Total Approved Police Request', value: police?.accountApproved || 0 },
                { title: 'Total Rejected Police Request', value: police?.accountRejected || 0 },
                { title: 'Pending User Access File', value: police?.fileAccessPending || 0 },
                { title: 'Approved User Access File', value: police?.fileAccessApproved || 0 },
                { title: 'Rejected User Access File', value: police?.fileAccessRejected || 0 },
              ],
            };

            dispatch(setPoliceOverview(policeCard));
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    getRelativeOverview: builder.mutation({
      query: (data) => ({
        url: `dashboard-relative-overview`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          let relative = response?.data?.data?.relative;        
          const evidenceCard = {
            title: 'Relative',
            totalItems: relative?.total,
            newItems: relative?.new,
            items: [
              { title: 'Total Relation Type', value: response?.data?.data?.relationType?.total || 0 },
            ],
          };
          dispatch(setRelativeOverview(evidenceCard));
        } catch (err) {
          // do nothing
        }
      },
    }),
    getIncomeOverview: builder.mutation({
      query: (data) => ({
        url: `dashboard-income-overview`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          let income = response?.data?.data?.income;

          const incomeCard = {
            title: 'Income',
            totalItems: `$${income?.total}`,
            newItems: income?.new,
            items: [
              { title: 'Total New Subscription Purchased', value: income?.totalPayments },
              { title: 'payments In TimeStamp', value: income?.paymentsInTimeStamp },
              {
                title: 'Upcoming 7 Days Expired Subscription',
                value: income?.upcomingSevenDaysExpiredSubscription,
              },
            ],
          };
          dispatch(setIncomeOverview(incomeCard));
        } catch (err) {
          // do nothing
        }
      },
    }),
    getPlanOverview: builder.mutation({
      query: (data) => ({
        url: `dashboard-plan-overview`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          let plan = response?.data?.data?.plan;  
        //   {
        //     "total": 32,
        //     "topPlanOverall": {
        //         "intervalCount": 1,
        //         "_id": "645e5c9a9073ac63f39f08f7",
        //         "title": "Every Month",
        //         "description": "plan description",
        //         "price": 3.99,
        //         "priceId": "price_1N6ZAyJ0Qy2dMwlaIwOyuXmb",
        //         "currency": "usd",
        //         "packageType": "monthly",
        //         "offer": "",
        //         "isPopular": true,
        //         "createdAt": "2023-05-12T15:34:50.076Z",
        //         "updatedAt": "2023-06-26T16:33:47.794Z",
        //         "__v": 0,
        //         "isDeleted": true,
        //         "count": 44
        //     },
        //     "topPlanInTimestamp": {
        //         "count": 0
        //     },
        //     "monthlyPlanPurchaseCount": 0,
        //     "yearlyPlanPurchaseCount": 0,
        //     "lifetimePlanPurchaseCount": 0
        // }   
          const planCard = {
            title: 'plan',
            totalItems: plan?.total,
            newItems: plan?.new,
            items: [
              { title: 'Monthly Plan Purchase Count', value: plan.monthlyPlanPurchaseCount || 0 },
              { title: 'Yearly Plan Purchase Count', value: plan.yearlyPlanPurchaseCount || 0 },
              { title: 'lifetime Plan Purchase Count', value: plan.lifetimePlanPurchaseCount || 0 },
              { title: 'top Plan In Timestamp', value: plan.topPlanInTimestamp?.count || 0 },
            ],
          };
          dispatch(setPlanOverview(planCard));
        } catch (err) {
          // do nothing
        }
      },
    }),
    getEvidenceOverview: builder.mutation({
      query: (data) => ({
        url: `dashboard-evidence-overview`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          let evidence = response?.data?.data?.evidence;

          const evidenceCard = {
            title: 'Evidence',
            totalItems: evidence?.total,
            newItems: evidence?.new,
            items: [
              { title: 'Total Photo', value: evidence?.photo },
              { title: 'Total video', value: evidence?.video },
              { title: 'Total audio', value: evidence?.audio },
              { title: 'Total document', value: evidence?.photo },
              { title: 'Total journal', value: evidence?.journal },
            ],
          };
          dispatch(setEvidenceOverview(evidenceCard));
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const {
  useGetEvidenceOverviewMutation,
  useGetUserOverviewMutation,
  useGetIncomeOverviewMutation,
  useGetPlanOverviewMutation,
  useGetRelativeOverviewMutation,
  useGetPoliceOverviewMutation,
  useGetStatisticsQuery,
  useGetLatestUsersQuery,
} = statisticsApi;
