/* eslint-disable react-hooks/exhaustive-deps */
'use client'; // This is a client component
import { Fragment, useState, useMemo } from 'react';
import AddAuthorityDepartment from '@/components/authority/AddAuthorityDepartment';
import UpdateAuthorityDepartment from '@/components/authority/UpdateAuthorityDepartment';
import moment from 'moment';
import Swal from 'sweetalert2';
import DeleteModal from '@/components/ui/Modals/DeleteModal';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { Menu, Transition } from '@headlessui/react';
import DotIcon from '@/assets/icons/DotIcon';
import { Float } from '@headlessui-float/react';
import {
  useGetAuthorityDepartmentQuery,
  useDeleteAuthorityDepartmentMutation,
} from '@/features/authorityDepartment/authorityDepartmentApi';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { PlusIcon } from '@heroicons/react/24/solid';
import { breadcrumbs } from '@/utils/data/breadcrumbs';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { AuthorityDepartmentLocal, AuthorityDepartment } from '@/types/department';
import Button from '@/components/ui/Buttons/Button';
import { Table } from '@/components/ui/Table';
import { useSelector } from 'react-redux';
const AuthorityDepartment: React.FC = () => {
  const [isAdd, setAdd] = useState<boolean>(false);
  //@ts-ignore
  const [item, setItem] = useState<AuthorityDepartment>({});

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [deleteAuthorityDepartment, { isLoading: isDelete }] =
    useDeleteAuthorityDepartmentMutation();
  const { data, isLoading } = useGetAuthorityDepartmentQuery('');
  const { authorityDepartments } = useSelector(
    (state: AuthorityDepartmentLocal) => state.authorityDepartment,
  );

  const columnHelper = createColumnHelper<AuthorityDepartment>();
  const onDelatePlan = async () => {
    try {
      //@ts-ignore

      const response = await deleteAuthorityDepartment(item);

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
        setIsDeleteModal(false);
      }
    } catch (err) {
      // Handle error
    }
  };

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('title', {
          cell: (info) => <span>{info.getValue() ? info.getValue() : '-'}</span>,
          header: () => <span>Title</span>,
        }),
        columnHelper.accessor('description', {
          cell: (info) => <span>{info.getValue() ? info.getValue()?.slice(0, 30) : '-'}</span>,
          header: () => <span>Description</span>,
        }),
        columnHelper.accessor('createdAt', {
          cell: (info) => <span>{moment(info.getValue()).format('MM-DD-YYYY')}</span>,
          header: () => <span>Create Date</span>,
        }),
        columnHelper.accessor('updatedAt', {
          cell: (info) => <span>{moment(info.getValue()).format('MM-DD-YYYY')}</span>,
          header: () => <span>Update Date</span>,
        }),

        columnHelper.accessor('_id', {
          cell: (info) => (
            <div className="text-right ">
              <Menu as="div" className="relative inline-block text-left bg-white">
              <Float placement="right" flip={0} shift={7} zIndex={99}>
                  <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-50 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <DotIcon
                      className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                      aria-hidden="true"
                    />
                  </Menu.Button>
              
                  <Menu.Items className="absolute right-0 z-20 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 divide-y divide-solid">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              setItem(info?.row?.original);
                              setIsEdit(true);
                            }}
                            className={`${
                              active ? 'bg-primary-400 text-white' : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <PencilIcon className="w-4 h-4 mr-2 text-gray-600 group-hover:text-white hover:text-primary-400" />{' '}
                            Edit
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              setItem(info?.row?.original);
                              setIsDeleteModal(true);
                            }}
                            className={`${
                              active ? 'bg-primary-400 text-white' : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <TrashIcon className="w-4 h-4 mr-2 text-gray-600 group-hover:text-white hover:text-primary-400" />
                            Delete
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
      ] as ColumnDef<AuthorityDepartment>[],
    [],
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="mb-1 text-xl">Authority Department</h2>
          <Breadcrumbs pages={breadcrumbs.authorityDepartment.lists} />
        </div>
        <div>
          <Button
            onClick={() => setAdd(true)}
            className="flex items-center px-3 py-3 text-sm rounded-lg font-samibold lg:py-2"
          >
            <PlusIcon className="w-5 h-5 mr-1 text-white hover:text-primary-400" /> Add authority
            department
          </Button>
        </div>
      </div>
      <Table
        isLoading={isLoading}
        data={authorityDepartments || []}
        columns={columns}
        title="User List"
      />
      <AddAuthorityDepartment open={isAdd} onClose={() => setAdd(false)} />
      <UpdateAuthorityDepartment updateData={item} open={isEdit} onClose={() => setIsEdit(false)} />
      <DeleteModal
        title="Delete Notify"
        text="This item will be deleted permanently. Are you sure you want to continue?"
        open={isDeleteModal}
        isDelete={isDelete}
        onConfirm={onDelatePlan}
        onClose={() => setIsDeleteModal(false)}
      />
    </div>
  );
};

export default AuthorityDepartment;
