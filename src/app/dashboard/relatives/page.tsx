/* eslint-disable react-hooks/exhaustive-deps */
'use client'; // This is a client component
import { Fragment, useMemo, useState } from 'react';
import AddRelatives from '@/components/authority/AddRelatives';
import UpdateRelatives from '@/components/authority/UpdateRelatives';
import { Table } from '@/components/ui/Table';
import moment from 'moment';
import Swal from 'sweetalert2';
import DeleteModal from '@/components/ui/Modals/DeleteModal';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { Menu, Transition } from '@headlessui/react';
import DotIcon from '@/assets/icons/DotIcon';
import Image from 'next/image';
import { Float } from '@headlessui-float/react';
import {
  useGetRelativesQuery,
  useDeleteRelativesMutation,
} from '@/features/relatives/relativesApi';
import { Relatives, RelativesState } from '@/types/department';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { PlusIcon } from '@heroicons/react/24/solid';
import { breadcrumbs } from '@/utils/data/breadcrumbs';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import Button from '@/components/ui/Buttons/Button';
import { useSelector } from 'react-redux';

const Relatives: React.FC = () => {
  const [isAdd, setAdd] = useState<boolean>(false);
  //@ts-ignore
  const [item, setItem] = useState<Relatives>({});

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDeleteModad, setIsDeleteModal] = useState<boolean>(false);
  const [deleteRelatives, { isLoading: isDelete }] = useDeleteRelativesMutation();
  const { data, isLoading } = useGetRelativesQuery('');
  const { relatives } = useSelector((state: RelativesState) => state.relatives);

  const columnHelper = createColumnHelper<Relatives>();
  const onDelateRelatives = async () => {
    try {
      //@ts-ignore

      const response = await deleteRelatives({ id: item?._id });

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
        columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
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
                    alt={info.getValue()}
                  />
                ) : (
                  <div className="flex items-center justify-center w-12 h-12 text-white rounded-full bg-primary-400">
                    {info.getValue()?.charAt(0)}
                  </div>
                )}
              </div>
              <div className="ml-4">
                <div className="font-medium text-gray-900">
                  {info.getValue() ? info.getValue() : '-'}
                </div>
                <div className="mt-1 text-gray-500 truncate">{info?.row?.original?.email}</div>
              </div>
            </div>
          ),
          header: () => <span>Name</span>,
        }),
        columnHelper.accessor(
          (row) => `${row?.relativeOf?.firstName} ${row?.relativeOf?.lastName}`,
          {
            id: 'relative',
            cell: (info) => (
              <div className="flex items-center w-full">
                <div className="flex-shrink-0 h-11 w-11">
                  {info?.row?.original?.relativeOf?.photo ? (
                    <Image
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full"
                      src={info?.row?.original?.relativeOf?.photo}
                      alt={info.getValue()}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-12 h-12 text-white rounded-full bg-primary-400">
                      {info.getValue()?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-900">
                    {info.getValue() ? info.getValue() : '-'}
                  </div>
                  <div className="mt-1 text-gray-500 truncate">
                    {info?.row?.original?.relativeOf?.email}
                  </div>
                  <div className="mt-1 text-gray-900 truncate font-bold">
                    {/* @ts-ignore */}
                    {info?.row?.original?.relationType?.relationName}
                  </div>
                </div>
              </div>
            ),
            header: () => <span>Relative</span>,
          },
        ),
        columnHelper.accessor('phone', {
          cell: (info) => <span>{info.getValue() ? info.getValue() : '-'}</span>,
          header: () => <span>Phone</span>,
        }),

        columnHelper.accessor('email', {
          cell: (info) => (
            <span>{moment(info?.row?.original?.createdAt).format('MM-DD-YYYY')}</span>
          ),
          header: () => <span>Create Date</span>,
        }),
        columnHelper.accessor('updatedAt', {
          cell: (info) => <span>{moment(info.getValue()).format('MM-DD-YYYY')}</span>,
          header: () => <span>Update Date</span>,
        }),

        columnHelper.accessor('_id', {
          cell: (info) => (
            <div className=" text-right">
               <Menu>
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
                              setItem({
                                ...info?.row?.original,
                                userId: info?.row?.original?.relativeOf?._id,
                                //@ts-ignore
                                relationType: info?.row?.original.relationType?._id,
                              });
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
      ] as ColumnDef<Relatives>[],
    [],
  );

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl mb-1">Relatives</h2>
          <Breadcrumbs pages={breadcrumbs.relatives.lists} />
        </div>
        <div>
          <Button
            onClick={() => setAdd(true)}
            className="flex items-center px-3 py-3 text-sm rounded-lg  font-samibold lg:py-2"
          >
            <PlusIcon className="h-5 w-5 text-white mr-1  hover:text-primary-400" /> Add Relatives
          </Button>
        </div>
      </div>
      <Table isLoading={isLoading} data={relatives || []} columns={columns} title="User List" />

      {isAdd ? <AddRelatives open={isAdd} onClose={() => setAdd(false)} /> : ''}
      <UpdateRelatives updateData={item} open={isEdit} onClose={() => setIsEdit(false)} />
      <DeleteModal
        title="Delete Relative"
        text="This item will be deleted permanently. Are you sure you want to continue?"
        open={isDeleteModad}
        isDelete={isDelete}
        onConfirm={onDelateRelatives}
        onClose={() => setIsDeleteModal(false)}
      />
    </div>
  );
};

export default Relatives;
