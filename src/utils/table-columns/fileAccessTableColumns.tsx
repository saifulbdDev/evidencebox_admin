// @ts-nocheck
import Image from 'next/image';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import moment from 'moment';
import Link from 'next/link';

const columnHelper = createColumnHelper();

const fileAccessTableColumns: ColumnDef<any, any>[] = [
  columnHelper.accessor('userId', {
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
  columnHelper.accessor('policeId', {
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
  columnHelper.accessor('createdAt', {
    cell: (info) => <span>{moment(info.getValue()).format('MM-DD-YYYY')}</span>,
    header: () => <span>Joined day</span>,
  }),
  columnHelper.accessor('updatedAt', {
    cell: (info) => <span>{moment(info.getValue()).format('MM-DD-YYYY')}</span>,
    header: () => <span>Update Profile</span>,
  }),

  columnHelper.accessor('submittedDocuments', {
    cell: (info) => (
      <a href={info.getValue()} download>
        View
      </a>
    ),
    header: () => <span>Submitted Documents</span>,
  }),

  columnHelper.accessor('_id', {
    cell: (info) => <span></span>,
    header: () => <span>Actions</span>,
  }),
];

export default fileAccessTableColumns;
