import React from 'react';
import Image from 'next/image';
import { Person } from '@/types/user';

interface PersonCardProps {
  person?: Person;
  num?: number;
}

const PersonCard: React.FC<PersonCardProps> = ({ person, num }) => {
  return (
    <div className="bg-white border-t px-6 py-4">
      <h4 className="text-sm text-gray-400 mb-2">Person {num}</h4>
      <div className="grid grid-cols-3 gap-x-2">
        <div className="w-full h-110">
          <Image
            width={118}
            alt="user"
            height={118}
            className="w-28 h-28 rounded-xl"
            src={person?.photo ? person?.photo : '/user.svg'}
          />
        </div>
        <div className="grid grid-cols-2 col-span-2">
          <div>
            <h4 className="text-sm font-normal text-gray-500">Name</h4>
            <h3 className="text-sm font-semibold text-gray-800 truncate">
              {person?.firstName} {person?.lastName}
            </h3>
          </div>
          <div>
            <h4 className="text-sm font-normal text-gray-500">Relation Type</h4>
            <h3 className="text-sm font-semibold text-gray-800 truncate">{person?.relationType}</h3>
          </div>
          <div>
            <h4 className="text-sm font-normal text-gray-500">Phone</h4>
            <h3 className="text-sm font-semibold text-gray-800">{person?.phone}</h3>
          </div>
          <div>
            <h4 className="text-sm font-normal text-gray-500 ">Email</h4>
            <h3 className="text-sm font-semibold text-gray-800 truncate">{person?.email}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
