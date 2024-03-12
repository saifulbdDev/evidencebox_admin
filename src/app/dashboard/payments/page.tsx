/* eslint-disable react-hooks/exhaustive-deps */
'use client'; // This is a client component
import React, { useMemo } from 'react';

import { Table } from '@/components/ui/Table';
import moment from 'moment';
import Image from 'next/image';
import { useGetPaymentsQuery } from '@/features/user/userApi';
import { Subscription } from '@/types/user';
import { breadcrumbs } from '@/utils/data/breadcrumbs';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
const Payments: React.FC = () => {
  const { data, isLoading } = useGetPaymentsQuery('');
  const payments: Subscription[] = data?.data?.subscriptions ?? [];
  const columnHelper = createColumnHelper<Subscription>();

  const columns = useMemo(
    () =>
      [

        columnHelper.accessor((row) => `${row?.user?.firstName} ${row?.user?.lastName}`, {
          id: 'fullName',
     
          cell: (info) => (
         
            (
              <div className="flex items-center w-full">
                <div className="flex-shrink-0 h-11 w-11">
                  {info?.row?.original?.user?.photo ? (
                    <Image
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full"
                      //@ts-ignore
                      src={info?.row?.original?.user?.photo}
                      alt={info?.getValue()}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-12 h-12 text-white rounded-full bg-primary-400">
                      {info?.getValue()?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-900">
                    {info?.getValue()}
                  </div>
                  <div className="mt-1 text-gray-500 truncate">{info?.row?.original?.user?.email}</div>
                </div>
              </div>
            )
          ),
          header: () => <span>Name</span>,
        }),
        columnHelper.accessor((row) => `${row?.user?.phone || ''}`, {
          id: 'phone',
           cell: (info) => <span>{info.getValue() ? info.getValue() : '-'}</span>,
          header: () => <span>Phone</span>,
        }),
        columnHelper.accessor((row) => `${row?.user?.email}`, {
          id: 'userEmail',
          cell: (info) => (
            <span>{moment(info?.row?.original?.plan?.createdAt).format('MM-DD-YYYY')}</span>
          ),
          header: () => <span>Payment Date</span>,
        }),
      
        columnHelper.accessor('user.stripeCustomerId', {
           cell: (info) => <span>{info.getValue() ? info.getValue() : '-'}</span>,
          header: () => <span>Stripe Customer Id</span>,
        }),
        columnHelper.accessor('plan._id', {
          cell: (info) => <span>{info.getValue() ? info.getValue() : '-'}</span>,
          header: () => <span>Plan Id</span>,
        }),
        columnHelper.accessor((row) => `${row?.plan.price || ''}`, {
          id: 'price',     
          cell: (info) => <span>{info.getValue() ? info.getValue() : '-'}</span>,
          header: () => <span>Plan price</span>,
        }),
        columnHelper.accessor('stripeSubscriptionId', {
          cell: (info) => <span>{info.getValue() ? info.getValue() : '-'}</span>,
          header: () => <span>Subscription Id</span>,
        }),

        columnHelper.accessor('subscriptionExpires', {
          cell: (info) => <span>{moment(info?.getValue()).format('MM-DD-YYYY')}</span>,
          header: () => <span>Subscription Expires</span>,
        }),
        columnHelper.accessor('subscriptionStatus', {
          cell: (info) => <span>{info.getValue() ? 'Yes' : 'No'} </span>,
          header: () => <span>Subscription Status</span>,
        }),
        columnHelper.accessor('paymentMethodType', {
          cell: (info) => <span>{info.getValue() ? info.getValue() : '-'} </span>,
          header: () => <span>Payment Method Type</span>,
        }),
        columnHelper.accessor('user.isAgreedToTermsAndConditions', {
          cell: (info) => <span>{info.getValue() ? 'Yes' : 'No'} </span>,
          header: () => <span>Agreed T&C</span>,
        }),
        columnHelper.accessor('user.isSuspended', {
          cell: (info) => <span>{info.getValue() ? 'Yes' : 'No'}</span>,
          header: () => <span>Suspended</span>,
        }),
        columnHelper.accessor('user.isVerified', {
          cell: (info) => <span>{info.getValue() ? 'Yes' : 'No'}</span>,
          header: () => <span>verified</span>,
        }),

        // columnHelper.accessor('_id', {
        //   cell: (info) => <span></span>,
        //   header: () => <span>Actions</span>,
        // }),
      ] as ColumnDef<Subscription>[],
    [],
  );

  return (
    <div className="">
      <div className="mb-5">
        <h2 className="mb-1 text-xl">Payments</h2>
        <Breadcrumbs pages={breadcrumbs.payments.lists} />
      </div>

      <Table isLoading={isLoading} data={payments} columns={columns} title="User List" />
    </div>
  );
};

export default Payments;
