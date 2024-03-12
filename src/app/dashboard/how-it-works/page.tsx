'use client'; // This is a client component
import React, { useState } from 'react';
import AddHowItWorks from '@/components/authority/AddHowItWorks';
import UpdateHowItWorks from '@/components/authority/UpdateHowItWorks';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import Button from '@/components/ui/Buttons/Button';
import VideoPlayer from '@/components/user/VideoPlayer';
import {
  useGetHowItWorksQuery,
  useDeleteHowItWorksMutation,
} from '@/features/department/departmentApi';
import { Loader } from '@/assets/icons';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { breadcrumbs } from '@/utils/data/breadcrumbs';
import { useSelector } from 'react-redux';
import { departmentState } from '@/types/department';
import Swal from 'sweetalert2';

const HowItWorks: React.FC = () => {
  const { isLoading } = useGetHowItWorksQuery('');
  const [deleteGetHowItWorks, { isLoading: isDelete }] = useDeleteHowItWorksMutation();
  const { howItWorks } = useSelector((state: departmentState) => state.department);
  const [isAdd, setAdd] = useState<boolean>(false);
  const [isUpdate, setUpdate] = useState<boolean>(false);
  const onDelete = async () => {
    deleteGetHowItWorks;

    try {
      const response = await deleteGetHowItWorks('');
      if ('error' in response) {
        // Handling error
        Swal.fire({
          title: 'Ops Something went wrong',
          //@ts-ignore
          text: response?.error?.message,
          icon: 'error',
        });
      } else if (response.data.status === 'success') {
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
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="mb-1 text-xl">How It Works</h2>
          <Breadcrumbs pages={breadcrumbs.howItWorks.lists} />
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={onDelete}
            isSubmitting={isDelete}
            variant="secondary"
            className="flex items-center px-3 py-3 group text-sm rounded-lg font-samibold lg:py-2"
          >
            <TrashIcon className="w-5 h-5 mr-1 text-gray-700 group-hover:text-white " />
            Delete
          </Button>
          {howItWorks?.description ? (
            <Button
              onClick={() => setUpdate(true)}
              className="flex items-center px-3 py-3 text-sm rounded-lg font-samibold lg:py-2"
            >
              <PlusIcon className="w-5 h-5  text-white hover:text-primary-400" />
              Update how it works
            </Button>
          ) : (
            <Button
              onClick={() => setAdd(true)}
              className="flex items-center px-3 py-3 text-sm rounded-lg font-samibold lg:py-2"
            >
              <PlusIcon className="w-5 h-5  text-white hover:text-primary-400" />
              Add how it works
            </Button>
          )}
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        {isLoading ? (
          <div className="flex items-center w-full min-h-screen ">
            <Loader className="mx-auto text-center stroke-primary-400 text-primary-400 mx" />
          </div>
        ) : howItWorks?.description ? (
          <div className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Descriptions</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {howItWorks?.description &&
                    howItWorks?.description?.map((item: string) => <p key={item}>{item}</p>)}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>

                <dd className="flex items-center mt-2 space-x-3 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {howItWorks?.video && (
                    <div className="mx-auto w-3/4">
                      <VideoPlayer url={howItWorks?.video} />
                    </div>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        ) : (
          <div className='flex justify-center items-center min-h-screen'>
            <p>how to work data empty</p>
          </div>
        )}
      </div>
      <AddHowItWorks open={isAdd} onClose={() => setAdd(false)} />
      <UpdateHowItWorks fromData={howItWorks} open={isUpdate} onClose={() => setUpdate(false)} />
    </div>
  );
};

export default HowItWorks;
