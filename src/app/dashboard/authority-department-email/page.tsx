/* eslint-disable react-hooks/exhaustive-deps */
'use client'; // This is a client component
import { Fragment, useEffect, useMemo, useState } from 'react';
import AddDepartmentEmail from '@/components/authority/AddDepartmentEmail';
import UpdateDepartmentEmail from '@/components/authority/UpdateDepartmentEmail';
import { Table } from '@/components/ui/Table';
import moment from 'moment';
import Swal from 'sweetalert2';
import { Float } from '@headlessui-float/react';
import DeleteModal from '@/components/ui/Modals/DeleteModal';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { Menu, Transition } from '@headlessui/react';
import DotIcon from '@/assets/icons/DotIcon';
import {
  useGetDepartmentEmailQuery,
  useDeleteDepartmentEmailMutation,
} from '@/features/departmentEmail/departmentEmailApi';
import { DepartmentEmail } from '@/types/department';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { PlusIcon } from '@heroicons/react/24/solid';
import { breadcrumbs } from '@/utils/data/breadcrumbs';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import Button from '@/components/ui/Buttons/Button';
import { useSelector } from 'react-redux';
import { departmentEmailState } from '@/types/department';
const DepartmentEmail: React.FC = () => {
  const [isAdd, setAdd] = useState<boolean>(false);
  const [item, setItem] = useState<DepartmentEmail>({
    authorityDepartment: '',
    email: '',
    phone: '',
    createdAt: '',
    updatedAt: '',
    _id: '',
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDeleteModad, setIsDeleteModal] = useState<boolean>(false);
  const [deleteDepartmentEmail, { isLoading: isDelete }] = useDeleteDepartmentEmailMutation();
  const { data, isLoading } = useGetDepartmentEmailQuery('');
  const { departmentEmails } = useSelector((state: departmentEmailState) => state.departmentEmail);

  const columnHelper = createColumnHelper<DepartmentEmail>();
  const onDelatePlan = async () => {
    try {
      //@ts-ignore

      const response = await deleteDepartmentEmail(item);

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
        columnHelper.accessor('phone', {
          cell: (info) => <span>{info.getValue() ? info.getValue() : '-'}</span>,
          header: () => <span>Phone</span>,
        }),

        columnHelper.accessor('email', {
          cell: (info) => <span>{info.getValue() ? info.getValue() : '-'}</span>,
          header: () => <span>Email</span>,
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
            <div className=" text-right">
              <Menu as="div" className="bg-white text-left">
                <Float placement="right" flip={0} shift={7} zIndex={99}>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md hover:bg-gray-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <DotIcon
                      className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                      aria-hidden="true"
                    />
                  </Menu.Button>

                  <Menu.Items className="absolute z-20 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                            <PencilIcon className="h-4 w-4 mr-2 group-hover:text-white text-gray-600 hover:text-primary-400" />{' '}
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
                            <TrashIcon className="h-4 w-4 mr-2 group-hover:text-white text-gray-600 hover:text-primary-400" />
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
      ] as ColumnDef<DepartmentEmail>[],
    [],
  );

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl mb-1">Department email</h2>
          <Breadcrumbs pages={breadcrumbs.departmentEmail.lists} />
        </div>
        <div>
          <Button
            onClick={() => setAdd(true)}
            className="flex items-center px-3 py-3 text-sm rounded-lg  font-samibold lg:py-2"
          >
            <PlusIcon className="h-5 w-5 text-white mr-1  hover:text-primary-400" /> Add Department
            email
          </Button>
        </div>
      </div>
      <Table
        isLoading={isLoading}
        data={departmentEmails || []}
        columns={columns}
        title="User List"
      />
      <AddDepartmentEmail open={isAdd} onClose={() => setAdd(false)} />
      <UpdateDepartmentEmail updateData={item} open={isEdit} onClose={() => setIsEdit(false)} />
      <DeleteModal
        title="Delete Notify"
        text="This item will be deleted permanently. Are you sure you want to continue?"
        open={isDeleteModad}
        isDelete={isDelete}
        onConfirm={onDelatePlan}
        onClose={() => setIsDeleteModal(false)}
      />
    </div>
  );
};

export default DepartmentEmail;
