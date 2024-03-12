/* eslint-disable react/jsx-no-undef */
'use client'; // This is a client component
import { Float } from '@headlessui-float/react';
import React, { useMemo, Fragment } from 'react';
// components
import { Table } from '@/components/ui/Table';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useSelector } from 'react-redux';

// redux
import { useGetFileAccessQuery } from '@/features/user/userApi';

// types
import { FileAccess, userState } from '@/types/user';

// utils

import { breadcrumbs } from '@/utils/data/breadcrumbs';
import Image from 'next/image';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import moment from 'moment';
import { Menu, Transition } from '@headlessui/react';
import DotIcon from '@/assets/icons/DotIcon';
import Swal from 'sweetalert2';

import { usePoliceActionMutation } from '@/features/user/userApi';

const FileAcces = () => {
  const { isLoading } = useGetFileAccessQuery('');
  const { FileAccess } = useSelector((state: userState) => state.user);

  const [policeAction, { isLoading: isAction }] = usePoliceActionMutation();
  const columnHelper = createColumnHelper<FileAccess>();
  const onPoliceAction = async (item: any, type: string) => {
    try {
      //@ts-ignore

      let fromData = {
        userFileAccessId: item?._id,
        policeId: item?.policeId?._id,
        type: type,
      };

      const response = await policeAction(fromData);

      if ('error' in response) {
        // Handling error
        Swal.fire({
          title: 'Ops Something went wrong',
          //@ts-ignore
          text: response?.error?.data?.message,
          icon: 'error',
        });
      } else if (response.data.status === 'success') {
        // Success message
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success',
        });
      }
    } catch (err) {
      // Handle error
    }
  };

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor((row) => `${row?.userId?.firstName} ${row?.userId?.lastName}`, {
          id: 'fullName',
          cell: (info: any) => {
            const userId = info?.row?.original?.userId;
            return (
              <div className="flex items-center w-full">
                <div className="flex-shrink-0 h-11 w-11">
                  {userId?.photo ? (
                    <Image
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full"
                      src={userId?.photo}
                      alt={userId?.firstName + userId?.lastName}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-12 h-12 text-white rounded-full bg-primary-400">
                      {userId?.firstName?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-900">
                    {userId?.firstName + ' ' + userId?.lastName}
                  </div>
                  <div className="mt-1 text-gray-500 truncate">{userId?.email}</div>
                </div>
              </div>
            );
          },
          header: () => <span>User</span>,
        }),
        columnHelper.accessor((row) => `${row?.policeId?.firstName} ${row?.policeId?.lastName}`, {
          id: 'police',
          cell: (info: any) => {
            const policeId = info?.row?.original?.policeId;
            return (
              <div className="flex items-center w-full">
                <div className="flex-shrink-0 h-11 w-11">
                  {policeId?.photo ? (
                    <Image
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full"
                      src={policeId?.photo}
                      alt={policeId?.firstName + policeId?.lastName}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-12 h-12 text-white rounded-full bg-primary-400">
                      {policeId?.firstName?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-900">
                    {policeId?.firstName + ' ' + policeId?.lastName}
                  </div>
                  <div className="mt-1 text-gray-500 truncate">{policeId?.email}</div>
                </div>
              </div>
            );
          },
          header: () => <span>Police</span>,
        }),

        columnHelper.accessor('status', {
          cell: (info) => <span>{info.getValue()}</span>,
          header: () => <span>Status</span>,
        }),
        columnHelper.accessor((row) => `${row?.userId?.email}`, {
          id: 'email',
          cell: (info) => (
            <span>{moment(info?.row?.original?.createdAt).format('MM-DD-YYYY')}</span>
          ),
          header: () => <span>Joined day</span>,
        }),
        columnHelper.accessor((row) => `${row?.policeId?.email}`, {
          id: 'policeEmail',
          cell: (info) => (
            <span>{moment(info?.row?.original?.updatedAt).format('MM-DD-YYYY')}</span>
          ),
          header: () => <span>Update Profile</span>,
        }),

        columnHelper.accessor('submittedDocuments', {
          cell: (info) => (
            //@ts-ignore
            <a href={info.getValue()} download>
              View
            </a>
          ),
          header: () => <span>Submitted Documents</span>,
        }),

        columnHelper.accessor('status', {
          cell: (info) => (
            <div className=" text-right">
              <Menu >
                <Float placement="right" flip={0} shift={7} zIndex={99}>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md hover:bg-gray-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <DotIcon
                      className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                      aria-hidden="true"
                    />
                  </Menu.Button>

                  <Menu.Items className="absolute z-[20000] right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 divide-y divide-solid">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            disabled={
                              //@ts-ignore
                              info.getValue() === 'approved' || info?.row?.original === 'reject'
                            }
                            onClick={() => {
                              //@ts-ignore
                              onPoliceAction(info?.row?.original, 'file-access-approve');
                            }}
                            className={`${
                              active ? 'bg-primary-400 text-white' : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            Approve
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            disabled={
                              //@ts-ignore
                              info.getValue() === 'approved' || info?.row?.original === 'reject'
                            }
                            onClick={() => {
                              //@ts-ignore
                              onPoliceAction(info?.row?.original, 'file-access-reject');
                            }}
                            className={`${
                              active ? 'bg-primary-400 text-white' : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            Reject
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Float>
              </Menu>
            </div>
          ),
          header: () => <div>Actions</div>,
        }),
      ] as ColumnDef<FileAccess>[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <div>
      <div className="mb-5">
        <h2 className="mb-1 text-xl">File Access</h2>
        <Breadcrumbs pages={breadcrumbs.fileAccess.lists} />
      </div>
      <Table isLoading={isLoading} data={FileAccess} columns={columns} title="File access List" />
    </div>
  );
};

export default FileAcces;
