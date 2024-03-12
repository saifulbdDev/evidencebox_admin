import moment from 'moment';
import React from 'react';
import { Plan } from '@/types/user';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';

type Props = {
  className: string;
  plan: Plan;
  onEdit: () => void;
  onDelete: () => void;
};

const PlanCard: React.FC<Props> = ({ className, plan, onEdit, onDelete }) => {
  return (
    <div
      className={`relative flex flex-col min-w-0 rounded-xl break-words p-3  bg-white  border-gray-300 ${className}`}
    >
      <div className="card-body flex flex-col pb-10 pb-lg-15">
        <div className="flex-grow-1">
          <section className="flex justify-between items-center mb-10">
            <div className="">
              <p className="text-gray-900 font-bold uppercase hover:text-primary-400 text-lg m-0">
                {plan?.packageType}
              </p>
              <p className="text-gray-500  text-sm m-0">
                Added: {moment(plan?.createdAt).format('MM-DD-YYYY')}
              </p>
              <p className="text-gray-500  text-sm m-0">
                Updated: {moment(plan?.updatedAt).format('MM-DD-YYYY')}
              </p>
            </div>

            <div className="flex justify-end flex-shrink-0 space-x-2 items-center">
              <button
                className=" bg-gray-200 group hover:bg-primary-300 px-2 py-1.5 rounded m-0"
                onClick={onEdit}
              >
                <PencilIcon className="h-4 w-4 group-hover:text-white text-gray-600 hover:text-primary-400" />
              </button>
              <button
                className=" bg-gray-200 group hover:bg-primary-200 px-2 py-1.5 rounded m-0"
                onClick={onDelete}
              >
                <TrashIcon className="h-4 w-4 group-hover:text-white text-gray-600 hover:text-primary-400" />
              </button>
            </div>
          </section>

          <p className="text-gray-900 font-bold hover:text-primary-400 text-xl">
            {plan?.title}
          </p>
          <p className="py-1">{plan?.description}</p>
          <p className="py-0 text-sm">
            <span className="text-gray-500 font-bold text-sm flex-grow-1">Price: </span>
            {`${plan?.price} ${plan?.currency?.toUpperCase()}`}
          </p>
          <p className="py-0 text-sm">
            <span className="text-gray-500 font-bold text-sm flex-grow-1">PriceId: </span>
            {plan?.priceId}
          </p>
          <p className="py-0 text-sm">
            <span className="text-gray-500 font-bold text-sm flex-grow-1">Offer: </span>
            {plan?.offer && plan?.offer?.length > 0 ? plan?.offer : 'No offer'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
