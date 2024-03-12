'use client'; // This is a client component
import React from 'react';
import Drawer from '@/components/ui/Drawer';
import { useGetEvidenceSingleDataQuery } from '@/features/user/userApi';
import Image from 'next/image';
import { EvidenceData, Person } from '@/types/user';
import { getExtension, getFilePath } from '@/utils/filePath';
import Link from 'next/link';
import PersonCard from './PersonCard';
import NotifyCard from './NotifyCard';
import { Loader } from '@/assets/icons';
import AuthorityStateCard from './AuthorityStateCard';
type UpdateAuthorityDepartmentProps = {
  open: boolean;
  onClose: () => void;
  evidenceDataId: string;
  password: string;
};

const ViewEvidenceDrawer = ({
  open,
  onClose,
  evidenceDataId,
  password,
}: UpdateAuthorityDepartmentProps) => {
  const { data, isLoading } = useGetEvidenceSingleDataQuery(
    {
      evidenceId: evidenceDataId,
      password: password,
    },
    { skip: evidenceDataId && password ? false : true },
  );
  const evidenceData = data?.data?.evidenceData;
  console.log(evidenceData, 'evidenceData >>>>>');

  return (
    <Drawer
      className="max-w-screen-sm "
      title={`Evidence Information  (${evidenceData?.title})`}
      open={open}
      onClose={onClose}
    >
      <div className="bg-white ">
          {isLoading ? (<div className='flex items-center text-center justify-center min-h-screen'><Loader/></div>) : (
         <>
        <div className="mb-3">
          <h4 className="text-lg font-bold text-gray-900 mb-2">Data Of</h4>
          <div className="grid grid-cols-3 gap-x-2">
            <div className="w-full h-110">
              <Image
                width={118}
                alt="user"
                height={118}
                className="w-28 h-28 rounded-xl"
                src={evidenceData?.dataOf?.photo ? evidenceData?.dataOf?.photo : '/user.svg'}
              />
            </div>
            <div className="grid grid-cols-2 col-span-2">
              <div>
                <h4 className="text-sm font-normal text-gray-500">Name</h4>
                <h3 className="text-sm font-semibold text-gray-800 truncate">
                  {evidenceData?.dataOf?.firstName} {evidenceData?.dataOf?.lastName}
                </h3>
              </div>
              <div>
                <h4 className="text-sm font-normal text-gray-500">Social Security Number</h4>
                <h3 className="text-sm font-semibold text-gray-800 truncate">
                  {evidenceData?.dataOf?.socialSecurityNumber}
                </h3>
              </div>
              <div>
                <h4 className="text-sm font-normal text-gray-500">Phone</h4>
                <h3 className="text-sm font-semibold text-gray-800">
                  {evidenceData?.dataOf?.phone}
                </h3>
              </div>
              <div>
                <h4 className="text-sm font-normal text-gray-500 ">Email</h4>
                <h3 className="text-sm font-semibold text-gray-800 truncate">
                  {evidenceData?.dataOf?.email}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <h4 className="text-lg font-bold text-gray-900 mb-2">Note Or Journal</h4>
          <div className="">
            <p>{evidenceData?.noteOrJournal}</p>
          </div>
        </div>

        <div className="mb-3">
          <h4 className="text-lg font-bold text-gray-900 mb-2">Notify Authorities List</h4>
          <div className="">
            {evidenceData?.notifyAuthoritiesList?.length
              ? evidenceData?.notifyAuthoritiesList.map((notify: any) => (
                  <NotifyCard key={notify?._id} notify={notify} />
                ))
              : 'No'}
          </div>
        </div>
        <div className="mb-3">
          <h4 className="text-lg font-bold text-gray-900 mb-2">Notify News List</h4>
          <div className="">
            {evidenceData?.notifyNewsList?.length
              ? evidenceData?.notifyNewsList.map((notify: any) => (
                  <NotifyCard key={notify?._id} notify={notify} />
                ))
              : 'No'}
          </div>
        </div>
        <div className="mb-3">
          <h4 className="text-lg font-bold text-gray-900 mb-2">Authority State</h4>
          <div className="">
            {evidenceData?.authorityState?.length
              ? evidenceData?.authorityState.map((authoritystate: any) => (
                  <AuthorityStateCard key={authoritystate?._id} authoritystate={authoritystate} />
                ))
              : 'No'}
          </div>
        </div>
        <div className="mb-3">
          <h4 className="text-lg font-bold text-gray-900 mb-2">Authority Department</h4>
          <div className="">
            {evidenceData?.authorityDepartment?.length
              ? evidenceData?.authorityDepartment.map((authoritystate: any) => (
                  <AuthorityStateCard key={authoritystate?._id} authoritystate={authoritystate} />
                ))
              : 'No'}
          </div>
        </div>
        <div className="mb-3">
          <h4 className="text-lg font-bold text-gray-900 mb-2">Assigned To</h4>
          <div className="text-sm font-semibold break-normal text-gray-800 truncate">
            {evidenceData?.assignedTo?.length
              ? evidenceData?.assignedTo.map((person: Person, key: number) => (
                  <PersonCard key={person?._id} person={person} num={key + 1} />
                ))
              : 'No'}
          </div>
        </div>

        <div className="mb-3">
          <h4 className="text-lg font-bold text-gray-900 mb-2">Files</h4>
          <div className="space-y-3 mt-3">
            {evidenceData?.files?.length
              ? evidenceData?.files.map((file: any) => (
                  <div
                    key={file}
                    className="flex items-center justify-between rounded-2xl border border-solid  bg-[#F9FAFB]"
                  >
                    <div className="flex items-center space-x-2">
                      <button className="px-2.5 mr-2 py-3 border border-solid border-gray-400 bg-[#F9FAFB] rounded-2xl">
                        <Image
                          src={`/${getExtension(file)}.svg`}
                          alt="download"
                          className=" mx-auto"
                          width={29}
                          height={36}
                          priority
                        />
                      </button>
                      <span className="text-base font-semibold text-gray-600">
                        {getFilePath(file)}
                      </span>
                    </div>

                    <Link
                      href={file}
                      target="black"
                      className="bg-primary-400 hover:bg-primary-300 focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50 text-white px-2.5 py-2 mr-2 rounded-full"
                    >
                      <Image
                        src="/download.svg"
                        alt="download"
                        className=" mx-auto"
                        width={14}
                        height={12}
                        priority
                      />
                    </Link>
                  </div>
                ))
              : ''}
          </div>
        </div>
        
        </>)}
      </div>
    </Drawer>
  );
};

export default ViewEvidenceDrawer;
