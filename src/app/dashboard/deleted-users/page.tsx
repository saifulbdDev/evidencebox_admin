'use client'; // This is a client component
import React, { useMemo } from 'react';
import { Table } from '@/components/ui/Table';
import moment from 'moment';
import Image from 'next/image';
import { useGetDeletedAccountsQuery } from '@/features/user/userApi';
import { UserData } from '@/types/user';

import { breadcrumbs } from '@/utils/data/breadcrumbs';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
const DeletedAccounts: React.FC = () => {
  const { data, isLoading } = useGetDeletedAccountsQuery('');
  const columnHelper = createColumnHelper<UserData>();
  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('firstName', {
          cell: (info) => (
            <div className="flex items-center w-full">
              <div className="h-11 w-11 flex-shrink-0">
                {info?.row?.original?.photo ? (
                  <Image
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full"
                    src={info?.row?.original?.photo}
                    alt={info?.row?.original?.firstName + info?.row?.original?.lastName}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary-400 text-white">
                    {info?.row?.original?.firstName?.charAt(0)}
                  </div>
                )}
              </div>
              <div className="ml-4">
                <div className="font-medium text-gray-900">
                  {info?.row?.original?.firstName + ' ' + info?.row?.original?.lastName}
                </div>
                <div className="mt-1 text-gray-500 truncate">{info?.row?.original?.email}</div>
              </div>
            </div>
          ),
          header: () => <span>Name</span>,
        }),

        columnHelper.accessor('phone', {
          cell: (info) => <span>{info.getValue()}</span>,
          header: () => <span>Phone</span>,
        }),
        columnHelper.accessor('createdAt', {
          cell: (info) => <span>{moment(info.getValue()).format('MM-DD-YYYY')}</span>,
          header: () => <span>Joined day</span>,
        }),
        columnHelper.accessor('updatedAt', {
          cell: (info) => <span>{moment(info.getValue()).format('MM-DD-YYYY')}</span>,
          header: () => <span>Update Profile</span>,
        }),

        columnHelper.accessor('stripeCustomerId', {
          cell: (info) => <span>{info.getValue()}</span>,
          header: () => <span>Stripe Customer Id</span>,
        }),
        columnHelper.accessor('currentPlan.packageType', {
          cell: (info) => <span>{info.getValue() ? info.getValue() : '-'}</span>,
          header: () => <span>CURRENT PLAN</span>,
        }),
        columnHelper.accessor('currentPlanExpires', {
          cell: (info) => (
            <span>{info.getValue() ? moment(info.getValue()).format('MM-DD-YYYY') : '-'}</span>
          ),
          header: () => <span>CURRENT PLAN EXPIRES</span>,
        }),
        columnHelper.accessor('isAgreedToTermsAndConditions', {
          cell: (info) => <span>{info.getValue() ? 'Yes' : 'No'} </span>,
          header: () => <span>Agreed T&C</span>,
        }),

        columnHelper.accessor('isVerified', {
          cell: (info) => <span>{info.getValue() ? 'Yes' : 'No'}</span>,
          header: () => <span>Verified</span>,
        }),
        columnHelper.accessor('isSuspended', {
          cell: (info) => <span>{info.getValue() ? 'Yes' : 'No'}</span>,
          header: () => <span>Suspended</span>,
        }),
        columnHelper.accessor('isDeleted', {
          cell: (info) => <span>{info.getValue() ? 'Yes' : 'No'}</span>,
          header: () => <span>Deleted</span>,
        }),
      ] as ColumnDef<UserData>[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <div className="">
      <div className="mb-5">
        <h2 className="text-xl mb-1">Deleted Accounts</h2>
        <Breadcrumbs pages={breadcrumbs.deletedAccounts.lists} />
      </div>

      <Table isLoading={isLoading} data={data?.data ?? []} columns={columns} title="User List" />
    </div>
  );
};

export default DeletedAccounts;
