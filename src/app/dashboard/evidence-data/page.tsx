'use client'; // This is a client component
import React, { useMemo, useState } from 'react';
import { Table } from '@/components/ui/Table';
import moment from 'moment';
import { EyeIcon } from '@heroicons/react/24/solid';
import ViewEvidenceDrawer from '@/components/user/ViewEvidenceDrawer';
import { useGetEvidenceDataQuery } from '@/features/user/userApi';
import { EvidenceData } from '@/types/user';
import PasswordModel from '@/components/ui/Modals/PasswordModel';

import { breadcrumbs } from '@/utils/data/breadcrumbs';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
const EvidenceData: React.FC = () => {
  const { data, isLoading } = useGetEvidenceDataQuery('');
  const columnHelper = createColumnHelper<EvidenceData>();
  /* @ts-ignore */
  const [evidenceDataId, setEvidenceDataId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordOpen, setPasswordOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const columns = useMemo(
    () =>
      [
        columnHelper.accessor('title', {
          cell: (info) => <span>{info.getValue()}</span>,
          header: () => <span>Title</span>,
        }),
        columnHelper.accessor('assignedTo', {
          cell: (info) => <span>{info?.getValue()?.length}</span>,
          header: () => <span>Assigned To</span>,
        }),
        columnHelper.accessor('dataType', {
          cell: (info) => <span>{info?.getValue()}</span>,
          header: () => <span>Data Type</span>,
        }),
        columnHelper.accessor('updatedAt', {
          cell: (info) => <span>{moment(info.getValue()).format('MM-DD-YYYY')}</span>,
          header: () => <span>Update Profile</span>,
        }),
        columnHelper.accessor('_id', {
          cell: (info) => (
            <div className=" text-right">
              <button
                onClick={() => {
                  setEvidenceDataId(info?.row?.original?._id);
                  setPasswordOpen(true);
                }}
                className={`bg-primary-400 text-white group justify-center flex w-full items-center rounded-md px-2 py-2 text-sm`}
              >
               <EyeIcon className="w-4 h-4 mr-2 text-white group-hover:text-white hover:text-primary-400" />

                View
              </button>
            </div>
          ),
          header: () => <div>Actions</div>,
        }),
      ] as ColumnDef<EvidenceData>[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const onViewEvidence = (password: string) => {
    setPassword(password);
    setIsViewModalOpen(true);
    setPasswordOpen(false);
  };
  return (
    <div className="">
      <div className="mb-5">
        <h2 className="text-xl mb-1">Evidence Data</h2>
        <Breadcrumbs pages={breadcrumbs.evidenceData.lists} />
      </div>

      <Table
        isLoading={isLoading}
        data={data?.data?.evidenceData || []}
        columns={columns}
        title="User List"
      />

      <PasswordModel
        open={isPasswordOpen}
        // @ts-ignore
        onConfirm={(password: string) => onViewEvidence(password)}
        onClose={() => setPasswordOpen(false)}
      />
      <ViewEvidenceDrawer
        evidenceDataId={evidenceDataId}
        password={password}
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />
    </div>
  );
};

export default EvidenceData;
