'use client'; // This is a client component
import React, { useState, useMemo, Fragment } from 'react';
import { Float } from '@headlessui-float/react';
import { Table } from '@/components/ui/Table';
import moment from 'moment';
import Image from 'next/image';
import { useGetUsersQuery, useUserActionMutation } from '@/features/user/userApi';
import { UserData, userState } from '@/types/user';
import { Menu, Transition } from '@headlessui/react';
import DotIcon from '@/assets/icons/DotIcon';
import { breadcrumbs } from '@/utils/data/breadcrumbs';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { TrashIcon, PencilIcon, EyeIcon } from '@heroicons/react/24/solid';
import UpdateDeathStatusDrawer from '@/components/user/UpdateDeathStatusDrawer';
import EditProfile from '@/components/user/EditProfile';
import ViewUserDrawer from '@/components/user/ViewUserDrawer';
import { useSelector } from 'react-redux';
import DeleteModal from '@/components/ui/Modals/DeleteModal';
import Swal from 'sweetalert2';

const Users: React.FC = () => {
  const { isLoading } = useGetUsersQuery('');
  const [userAction, { isLoading: isAction }] = useUserActionMutation();
  const { users } = useSelector((state: userState) => state.user);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isUpdateProfile, setUpdateProfileDrawer] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isPermanentDeleteModalOpen, setIsPermanentDeleteModalOpen] = useState<boolean>(false);
  const [isDeathStatusUpdateDrawerOpen, setIsDeathStatusUpdateDrawerOpen] =
    useState<boolean>(false);

  const closeModals = () => {
    setIsDeleteModalOpen(false);
    setIsPermanentDeleteModalOpen(false);
  };

  const onUserAction = async (id: string, type: string) => {
    try {
      //@ts-ignore

      let reqData = {
        userId: id,
        type: type,
      };

      const response = await userAction(reqData);

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
        columnHelper.accessor((row) => `${row?.currentPlan?.packageType || ''}`, {
          id: 'packageType',
          cell: (info) => <span>{info.getValue() ? info.getValue() : '-'}</span>,
          header: () => <span>CURRENT PLAN</span>,
        }),

        columnHelper.accessor('currentPlanExpires', {
          cell: (info) => (
            <span>{info.getValue() ? moment(info.getValue()).format('MM-DD-YYYY') : '-'}</span>
          ),
          header: () => <span>CURRENT PLAN EXPIRES</span>,
        }),

        columnHelper.accessor('email', {
          cell: (info) => (
            <span>
              {info?.row?.original?.deathDate
                ? moment(info?.row?.original?.deathDate).format('MM-DD-YYYY')
                : '-'}
            </span>
          ),
          header: () => <span>Death Date</span>,
        }),

        columnHelper.accessor('isVerified', {
          cell: (info) => <span>{info.getValue() ? 'Yes' : 'No'}</span>,
          header: () => <span>Verified</span>,
        }),
        columnHelper.accessor('isSuspended', {
          cell: (info) => <span>{info.getValue() ? 'Yes' : 'No'}</span>,
          header: () => <span>Suspended</span>,
        }),

        columnHelper.accessor('_id', {
          cell: (info) => (
            <div className="text-right ">
              <Menu>
                <Float placement="right" flip={4} shift={5} zIndex={99}>
                  <Menu.Button className="inline-flex z-0 justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-50 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <DotIcon
                      className="w-5 h-5 ml-2 z-index-2 text-violet-200 hover:text-violet-100"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 z-20 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 divide-y divide-solid">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              setSelectedUser(info?.row?.original);
                              setIsViewModalOpen(true);
                            }}
                            className={`${
                              active ? 'bg-primary-400 text-white' : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <EyeIcon className="w-4 h-4 mr-2 text-gray-600 group-hover:text-white hover:text-primary-400" />{' '}
                            View Details
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              setSelectedUser(info?.row?.original);
                              setIsDeathStatusUpdateDrawerOpen(true);
                            }}
                            className={`${
                              active ? 'bg-primary-400 text-white' : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <PencilIcon className="w-4 h-4 mr-2 text-gray-600 group-hover:text-white hover:text-primary-400" />{' '}
                            Update death status
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              setSelectedUser(info?.row?.original);
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
                            onClick={() => {
                              //@ts-ignore
                              setSelectedUser(info?.row?.original);
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
                              onUserAction(info?.row?.original?._id, 'suspend');
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
                              onUserAction(info?.row?.original?._id, 'restore');
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
                              setSelectedUser(info?.row?.original);
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
                              onUserAction(info?.row?.original?._id, 'password-reset');
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
                    </div>
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
    <>
      <div className="mb-5">
        <h2 className="mb-1 text-xl">Users</h2>
        <Breadcrumbs pages={breadcrumbs.users.lists} />
      </div>

      <Table isLoading={isLoading} data={users} columns={columns} title="User List" />

      {selectedUser?._id && (
        <>
          <EditProfile
            title="Update Profile"
            userData={selectedUser}
            open={isUpdateProfile}
            onClose={() => setUpdateProfileDrawer(false)}
          />
          <UpdateDeathStatusDrawer
            userData={selectedUser}
            open={isDeathStatusUpdateDrawerOpen}
            onClose={() => setIsDeathStatusUpdateDrawerOpen(false)}
          />
          <ViewUserDrawer
            userData={selectedUser}
            open={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
          />
          <DeleteModal
            title="Delete Notify"
            text="This user account will be deleted. Are you sure you want to continue?"
            open={isDeleteModalOpen}
            isDelete={isAction}
            onConfirm={() => onUserAction(selectedUser?._id, 'delete')}
            onClose={() => setIsDeleteModalOpen(false)}
          />
          <DeleteModal
            title="Delete Notify"
            text="This user account will be deleted permanently. Are you sure you want to continue?"
            open={isPermanentDeleteModalOpen}
            isDelete={isAction}
            onConfirm={() => onUserAction(selectedUser?._id, 'delete-permanently')}
            onClose={() => setIsPermanentDeleteModalOpen(false)}
          />
        </>
      )}
    </>
  );
};

export default Users;
