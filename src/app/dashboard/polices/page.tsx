/* eslint-disable react/jsx-no-undef */
'use client'; // This is a client component
import React, { useMemo,  useState } from 'react';
import { Float } from '@headlessui-float/react';

import Image from 'next/image';
import { Table } from '@/components/ui/Table';
import moment from 'moment';
import { useGetPoliceQuery, usePoliceActionMutation } from '@/features/user/userApi';
import { UserData, userState } from '@/types/user';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import DotIcon from '@/assets/icons/DotIcon';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { Menu, } from '@headlessui/react';
import { breadcrumbs } from '@/utils/data/breadcrumbs';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import DeleteModal from '@/components/ui/Modals/DeleteModal';
import EditProfile from '@/components/user/EditProfile';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';

const Polices: React.FC = () => {
  const { isLoading } = useGetPoliceQuery('');
  const [policeAction, { isLoading: isAction }] = usePoliceActionMutation();
  const { polices } = useSelector((state: userState) => state.user);

  const [isUpdateProfile, setUpdateProfileDrawer] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isPermanentDeleteModalOpen, setIsPermanentDeleteModalOpen] = useState<boolean>(false);
  const [selectedPolice, setSelectedPolice] = useState<UserData | null>(null);

  const closeModals = () => {
    setIsDeleteModalOpen(false);
    setIsPermanentDeleteModalOpen(false);
  };

  const onPoliceAction = async (id: string, type: string) => {
    try {
      //@ts-ignore

      let reqData = {
        policeId: id,
        type: type,
      };

      const response = await policeAction(reqData);

      if ('error' in response) {
        closeModals();
        // Handling error
        Swal.fire({
          title: 'Ops Something went wrong',
          //@ts-ignore
          text: response?.error?.data?.message,
          icon: 'error',
        });
      } else if (response.data.status === 'success') {
        closeModals();
        // Success message
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success',
        });
      }
    } catch (err) {
      // Handle error
      closeModals();
    }
  };

  const columnHelper = createColumnHelper<UserData>();
  const columns = useMemo(
    () =>
      [
        columnHelper.accessor((row) => `${row?.firstName} ${row?.lastName}`, {
          id: 'fullName',
          cell: (info) => (
            <div className="flex items-center w-full">
              <div className="flex-shrink-0 h-11 w-11">
                {info?.row?.original?.photo ? (
                  <Image
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full"
                    src={info?.row?.original?.photo}
                    alt={info?.row?.original?.firstName + info?.row?.original?.lastName}
                  />
                ) : (
                  <div className="flex items-center justify-center w-12 h-12 text-white rounded-full bg-primary-400">
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
        columnHelper.accessor('ID', {
          cell: (info) => <span>{info.getValue()}</span>,
          header: () => <span>ID</span>,
        }),
        columnHelper.accessor('isVerified', {
          cell: (info) => <span>{info.getValue() ? 'Yes' : 'No'}</span>,
          header: () => <span>Verified</span>,
        }),
        columnHelper.accessor('email', {
          cell: (info) => (
            <span>{moment(info?.row?.original?.createdAt).format('MM-DD-YYYY')}</span>
          ),
          header: () => <span>Joined day</span>,
        }),
        columnHelper.accessor('updatedAt', {
          cell: (info) => <span>{moment(info.getValue()).format('MM-DD-YYYY')}</span>,
          header: () => <span>Update Profile</span>,
        }),

        columnHelper.accessor('isRejected', {
          cell: (info) => (
            <div className="text-right ">
              <Menu>
                <Float placement="bottom" flip={0} shift={7} zIndex={99}>
                  <Menu.Button className="inline-flex z-0 justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-50 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <DotIcon
                      className="w-5 h-5 ml-2 z-index-2 text-violet-200 hover:text-violet-100"
                      aria-hidden="true"
                    />
                  </Menu.Button>

                  <Menu.Items
                    static
                    className="w-48 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden focus:outline-none"
                  >
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            setSelectedPolice(info?.row?.original);
                            setUpdateProfileDrawer(true);
                          }}
                          className={`${
                            active ? 'bg-primary-400 text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <PencilIcon className="w-4 h-4 mr-2 text-gray-600 group-hover:text-white hover:text-primary-400" />{' '}
                          Update Profile
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          //@ts-ignore
                          disabled={info.getValue() || info?.row?.original?.isVerified}
                          onClick={() => {
                            //@ts-ignore
                            onPoliceAction(info?.row?.original?._id, 'account-verify-approve');
                          }}
                          className={`${
                            active ? 'bg-primary-400 text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <PencilIcon className="w-4 h-4 mr-2 text-gray-600 group-hover:text-white hover:text-primary-400" />{' '}
                          Approve account
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          //@ts-ignore
                          disabled={info.getValue() || info?.row?.original?.isVerified}
                          onClick={() => {
                            //@ts-ignore
                            onPoliceAction(info?.row?.original?._id, 'account-verify-reject');
                          }}
                          className={`${
                            active ? 'bg-primary-400 text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <PencilIcon className="w-4 h-4 mr-2 text-gray-600 group-hover:text-white hover:text-primary-400" />{' '}
                          Reject account
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            setSelectedPolice(info?.row?.original);
                            setIsDeleteModalOpen(true);
                          }}
                          className={`${
                            active ? 'bg-primary-400 text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <TrashIcon className="w-4 h-4 mr-2 text-gray-600 group-hover:text-white hover:text-primary-400" />{' '}
                          Delete Account
                        </button>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            //@ts-ignore
                            onPoliceAction(info?.row?.original?._id, 'suspend');
                          }}
                          className={`${
                            active ? 'bg-primary-400 text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <PencilIcon className="w-4 h-4 mr-2 text-gray-600 group-hover:text-white hover:text-primary-400" />{' '}
                          Suspend Account
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            //@ts-ignore
                            onPoliceAction(info?.row?.original?._id, 'restore');
                          }}
                          className={`${
                            active ? 'bg-primary-400 text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <PencilIcon className="w-4 h-4 mr-2 text-gray-600 group-hover:text-white hover:text-primary-400" />{' '}
                          Restore Account
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            setSelectedPolice(info?.row?.original);
                            setIsPermanentDeleteModalOpen(true);
                          }}
                          className={`${
                            active ? 'bg-primary-400 text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <TrashIcon className="w-4 h-4 mr-2 text-gray-600 group-hover:text-white hover:text-primary-400" />{' '}
                          Delete Permanently
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            //@ts-ignore
                            onPoliceAction(info?.row?.original?._id, 'password-reset');
                          }}
                          className={`${
                            active ? 'bg-primary-400 text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <PencilIcon className="w-4 h-4 mr-2 text-gray-600 group-hover:text-white hover:text-primary-400" />{' '}
                          Password Reset
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Float>
              </Menu>
            </div>
          ),
          header: () => <div>Actions</div>,
        }),
      ] as ColumnDef<UserData>[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <div>
      <div className="mb-5">
        <h2 className="mb-1 text-xl">Polices</h2>
        <Breadcrumbs pages={breadcrumbs.polices.lists} />
      </div>
      <Table isLoading={isLoading} data={polices} columns={columns} title="Police List" />
      {selectedPolice?._id && (
        <>
          <EditProfile
            title="Update Police Profile"
            userData={selectedPolice}
            open={isUpdateProfile}
            onClose={() => setUpdateProfileDrawer(false)}
          />
          <DeleteModal
            title="Delete Notify"
            text="This user account will be deleted. Are you sure you want to continue?"
            open={isDeleteModalOpen}
            isDelete={isAction}
            onConfirm={() => onPoliceAction(selectedPolice?._id, 'delete')}
            onClose={() => setIsDeleteModalOpen(false)}
          />
          <DeleteModal
            title="Delete Notify"
            text="This user account will be deleted permanently. Are you sure you want to continue?"
            open={isPermanentDeleteModalOpen}
            isDelete={isAction}
            onConfirm={() => onPoliceAction(selectedPolice?._id, 'delete-permanently')}
            onClose={() => setIsPermanentDeleteModalOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default Polices;
