/* eslint-disable react-hooks/exhaustive-deps */
'use client'; // This is a client component

// components
import { useEffect, useState } from 'react';
import { Loader } from '@/assets/icons';
import SingleOverview from '@/components/dashboard/SingleOverview';
import Statistics from '@/components/dashboard/Statistics';
import LatestUser from '@/components/dashboard/LatestUser';
import { useSelector } from 'react-redux';
import { dashboardState } from '@/types/types';
import { getTimestamp } from '@/utils/timestamp';
import {
  useGetUserOverviewMutation,
  useGetEvidenceOverviewMutation,
  useGetIncomeOverviewMutation,
  useGetPlanOverviewMutation,
  useGetRelativeOverviewMutation,
  useGetPoliceOverviewMutation,
} from '@/features/dashboard/dashboardApi';
const Dashboard = () => {
  const [getIncomeOverview, { isLoading: isIncome }] = useGetIncomeOverviewMutation();
  const [getPlanOverview, { isLoading: isPlan }] = useGetPlanOverviewMutation();
  const [getRelativeOverview, { isLoading: isRelative }] = useGetRelativeOverviewMutation();
  const [getPoliceOverview, { isLoading: isPolice }] = useGetPoliceOverviewMutation();
  const [getUserOverview, { isLoading }] = useGetUserOverviewMutation();
  const [getEvidenceOverview, { isLoading: isEvidence }] = useGetEvidenceOverviewMutation();

  const {
   
    policeOverview,
    relativeOverview,
    incomeOverview,
    planOverview,
    evidenceOverview,
    userOverview,
  } = useSelector((state: dashboardState) => state.dashboard);
  const [filter, setFilter] = useState<string>('week');
  const changeHandler =  (value: string) => {
    setFilter(value);
    const timestamp = getTimestamp(value);
     getUserOverview(timestamp);
     getPoliceOverview(timestamp);
     getEvidenceOverview(timestamp);
     getRelativeOverview(timestamp);
     getPlanOverview(timestamp);
     getIncomeOverview(timestamp);
  };

  useEffect(() => {
    changeHandler('week');
  }, []);

  return (
    <main>
      <section className="max-w-7xl">
        <div className="flex items-center mb-4 justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Total Overview</h2>
          </div>
          <div>
            <select
              onChange={(event) => changeHandler(event?.target?.value)}
              className="block appearance-none  bg-white border pr-8 border-[#D9D9D9] text-sm font-normal hover:border-gray-200 px-4 py-2 rounded-lg  focus:outline-none "
            >
              <option value="week">This week</option>
              <option value="month">This Month</option>
              <option value="year">This year</option>
            </select>
          </div>
        </div>
        <div className={`grid items-start gap-4 mb-6 grid-cols-3`}>
          {isLoading || !userOverview?.title ? (
            <div className="flex bg-[#ffffff] rounded-2xl  min-h-[507px] overflow-hidden items-center justify-center ">
              <Loader />
            </div>
          ) : !isLoading && userOverview?.title ? (
            <SingleOverview
              filter={filter}
              svgColor="#7842E8"
              valueColor="#5919de"
              url="/dashboard/users"
              title={userOverview?.title}
              totalItems={userOverview?.totalItems}
              newItems={userOverview?.newItems}
              items={userOverview?.items}
            />
          ) : (
            ''
          )}

          {isPolice || !policeOverview?.title ? (
            <div className="flex bg-[#ffffff] rounded-2xl  min-h-[507px] overflow-hidden items-center justify-center ">
              <Loader />
            </div>
          ) : !isPolice && policeOverview?.title ? (
            <SingleOverview
              filter={filter}
              svgColor="#16C733"
              valueColor="#00A81B"
              url="/dashboard/polices"
              title={policeOverview?.title}
              totalItems={policeOverview?.totalItems}
              newItems={policeOverview?.newItems}
              items={policeOverview?.items}
            />
          ) : (
            ''
          )}

          {isEvidence || !evidenceOverview?.title ? (
            <div className="flex bg-[#ffffff] rounded-2xl  min-h-[507px] overflow-hidden items-center justify-center ">
              <Loader />
            </div>
          ) : !isEvidence && evidenceOverview?.title ? (
            <SingleOverview
              filter={filter}
              svgColor="#EC3737"
              valueColor="#EC3737"
              url="/dashboard/evidence-data"
              title={evidenceOverview?.title}
              totalItems={evidenceOverview?.totalItems}
              newItems={evidenceOverview?.newItems}
              items={evidenceOverview?.items}
            />
          ) : (
            ''
          )}
          {isIncome || !incomeOverview?.title ? (
            <div className="flex bg-[#ffffff] rounded-2xl  min-h-[507px] overflow-hidden items-center justify-center ">
              <Loader />
            </div>
          ) : !isIncome && incomeOverview?.title ? (
            <SingleOverview
              filter={filter}
              svgColor="#F9BE2E"
              valueColor="#F09001"
              url="/dashboard/payments"
              title={incomeOverview?.title}
              totalItems={incomeOverview?.totalItems}
              newItems={incomeOverview?.newItems}
              items={incomeOverview?.items}
            />
          ) : (
            ''
          )}

          {isRelative || !relativeOverview?.title ? (
            <div className="flex bg-[#ffffff] rounded-2xl  min-h-[507px] overflow-hidden items-center justify-center ">
              <Loader />
            </div>
          ) : !isRelative && relativeOverview?.title ? (
            <SingleOverview
              filter={filter}
              svgColor="#45CFDD"
              valueColor="#45CFDD"
              url="/dashboard/relatives"
              title={relativeOverview?.title}
              totalItems={relativeOverview?.totalItems}
              newItems={relativeOverview?.newItems}
              items={relativeOverview?.items}
            />
          ) : (
            ''
          )}
          {isPlan || !planOverview?.title ? (
            <div className="flex bg-[#ffffff] rounded-2xl  min-h-[507px] overflow-hidden items-center justify-center ">
              <Loader />
            </div>
          ) : !isPlan && planOverview?.title ? (
            <SingleOverview
              filter={filter}
              svgColor="#D800A6"
              valueColor="#D800A6"
              url="/dashboard/plans"
              title={planOverview?.title}
              totalItems={planOverview?.totalItems}
              newItems={planOverview?.newItems}
              items={planOverview?.items}
            />
          ) : (
            ''
          )}
        </div>
      </section>
      <section className="flex max-w-7xl items-start justify-center mb-6 space-x-4">
        <div className="w-7/12">
          <Statistics />
        </div>
        <div className="flex flex-col w-5/12">
          <LatestUser />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
