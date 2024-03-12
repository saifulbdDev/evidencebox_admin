'use client'; // This is a client component
import Link from 'next/link';

import React from 'react';
import { Loader } from '@/icons';
import { useGetLatestUsersQuery } from '@/features/dashboard/dashboardApi';
function LatestUser({ markets = [] }) {
  const { data, isLoading } = useGetLatestUsersQuery('');

  return (
    <div className="bg-white py-5 px-5 rounded-2xl  ">
      <div className="flex items-center justify-between">
        <div>
          {' '}
          <h2 className="text-xl font-bold ">Latest User</h2>{' '}
        </div>
        <div>
          <Link
            href="/dashboard/users/"
            className="flex bg-primary-400 hover:bg-primary-300 focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50 text-white items-center px-4  text-sm rounded-lg font-semibold lg:py-1.5"
          >
            See All
          </Link>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className=" px-3 w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="text-sm text-left text-gray-900 px-3 py-1">Name</th>
              <th className="text-sm text-left text-gray-900 px-3 py-1">Email</th>
              <th className="text-sm text-left text-gray-900 px-3 py-1">Phone Number</th>
            </tr>
          </thead>

          {!markets.length ? (
            <tbody>
              {markets.map((user: any) => (
                <tr key={user?._id} className="border-b">
                  <td className="whitespace-nowrap py-2  text-sm px-3">
                    {user?.firstName} {user?.lastName}
                  </td>

                  <td className="px-3 text-left capitalize whitespace-nowrap py-2 md:text-base text-sm text-gray-900">
                    {user?.email}
                  </td>
                  <td className="px-3 text-left py-2 md:text-base text-sm text-gray-900">
                    {user?.phone}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td className="py-10 h-56" colSpan={7}>
                  {isLoading ? (
                    <Loader className="stroke-primary-400 mx-auto text-primary-400 text-center mx" />
                  ) : (
                    'Empty'
                  )}
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default LatestUser;
