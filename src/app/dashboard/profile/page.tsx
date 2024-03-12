'use client'; // This is a client component
/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import React from 'react';
import { useGetProfileQuery } from '@/features/auth/authApi';
const Profile = () => {
  const { data, isLoading } = useGetProfileQuery({
  
    refetchOnMountOrArgChange: true,
  
  });
  const user = data?.data ?? {};

  return (
    <div className="bg-white rounded-lg shadow-3xl w-full md:w-2/3 mx-auto">
      <div className="px-6 py-5 text-center">
        <Image
          src={user?.photo ? user?.photo : '/user.svg'}
          alt="Vercel Logo"
          className="mx-auto rounded-full "
          width={172}
          height={172}
          priority
        />
        <h3 className="my-3 text-lg font-bold">
          {user?.firstName} {user?.lastName}
        </h3>
        <div className="py-4 border-t border-gray-300 border-solid">
          <ul role="list" className="space-y-4 ">
            <li className="flex items-center justify-start">
              <div className="mr-2">
                <Image
                  src={'/email.svg'}
                  alt="email"
                  className="w-4 mx-auto"
                  width={13}
                  height={12}
                  priority
                />
              </div>
              <span className="text-sm font-normal text-gray-800">{user?.email}</span>
            </li>
            <li className="flex items-center justify-start">
              <div className="mr-2">
                <Image
                  src="/phone.svg"
                  alt="phone"
                  className="w-4 mx-auto"
                  width={13}
                  height={12}
                  priority
                />
              </div>
              <span className="text-sm font-normal text-gray-800">{user?.phone}</span>
            </li>
            <li className="flex items-center justify-start">
              <div className="mr-2">
                <Image
                  src="/location.svg"
                  alt="location"
                  className="w-4 mx-auto"
                  width={13}
                  height={12}
                  priority
                />
              </div>
              <span className="text-sm font-normal text-gray-800 text-start black">
                {user?.city ? user?.city + ',' : ''}
                 <span className="ml-1">{user?.state}</span>
              </span>
            </li>
            {/* <li className="flex items-center justify-start">
              <div className="mr-2">
                <Image
                  src="/passport.svg"
                  alt="passport"
                  className="w-4 mx-auto"
                  width={13}
                  height={12}
                  priority
                />
              </div>
              <span className="text-sm font-normal text-gray-800">Passport.pdf</span>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
