'use client'; // This is a client component
import React from 'react';
import Drawer from '@/components/ui/Drawer';
import Link from 'next/link';
import Button from '@/components/ui/Buttons/Button';
import Image from 'next/image';
import { UserData } from '@/types/user';
import moment from 'moment';
type UpdateAuthorityDepartmentProps = {
  open: boolean;
  onClose: () => void;
  userData: UserData;
};

const ViewUserDrawer = ({ open, onClose, userData }: UpdateAuthorityDepartmentProps) => {


  return (
    <Drawer className="max-w-lg" title="User Information" open={open} onClose={onClose}>
      <div className="bg-white ">
        <div className="w-full mb-3 pt-3 border-t">
          <Image
            width={80}
            alt="user"
            height={80}
            className="w-20 h-20 rounded-full"
            src={userData?.photo ? userData?.photo : '/user.svg'}
          />
        </div>
        <div className="grid grid-cols-2  gap-5  col-span-2">
          <div className="">
            <h4 className="text-sm font-normal text-gray-500">Name</h4>
            <div className="text-sm font-semibold break-normal text-gray-800 truncate">
              {userData.firstName} {userData?.lastName}
            </div>
          </div>

          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">Phone</h4>
            <div className="break-all text-sm font-semibold text-gray-800">
              {userData?.phone ? userData?.phone : 'No'}
            </div>
          </div>
          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">Email</h4>
            <div className="text-sm font-semibold break-all text-gray-800 ">
              {userData?.email ? userData?.email : 'No'}
            </div>
          </div>
          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">City</h4>
            <h3 className="break-all text-sm font-semibold text-gray-800">
              {userData?.city ? userData?.city : 'No'}
            </h3>
          </div>
          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">State</h4>
            <h3 className="break-all text-sm font-semibold text-gray-800">
              {userData?.state ? userData?.state : 'No'}
            </h3>
          </div>
          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">Zip</h4>
            <h3 className="break-all text-sm font-semibold text-gray-800">
              {userData?.zip ? userData?.zip : 'No'}
            </h3>
          </div>
          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">Country</h4>
            <h3 className="break-all text-sm font-semibold text-gray-800">
              {userData?.country ? userData?.country : 'No'}
            </h3>
          </div>
          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">Social security number</h4>
            <div className="break-all text-sm font-semibold text-gray-800">
              {userData?.socialSecurityNumber ? userData?.socialSecurityNumber : 'No'}
            </div>
          </div>
          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">Death date</h4>
            <div className="break-all text-sm font-semibold text-gray-800">
              {userData?.deathDate ? moment(userData?.deathDate).format('MM-DD-YYYY') : 'No'}
            </div>
          </div>
          {userData?.deathCertificate && (
            <div className="block ">
              <h4 className="text-sm font-normal text-gray-500">Death Certificate</h4>
              <div className="break-all text-sm font-semibold text-gray-800">
                <Link href={userData?.deathCertificate} target="_blank">
                  Download{' '}
                  <Button className="ml-1 px-2.5 py-2 rounded-full">
                    <Image
                      src="/download.svg"
                      alt="download"
                      className=" mx-auto"
                      width={10}
                      height={8}
                      priority
                    />
                  </Button>
                </Link>
              </div>
            </div>
          )}
          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">Plan expires</h4>
            <div className="break-all text-sm font-semibold text-gray-800">
              {userData?.currentPlanExpires
                ? moment(userData?.currentPlanExpires).format('MM-DD-YYYY')
                : 'No'}
            </div>
          </div>        
          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">Plan title</h4>
            <div className="break-all text-sm font-semibold text-gray-800">
              { userData?.currentPlan?.title ? userData?.currentPlan?.title : 'No'}
            </div>
          </div>
          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">Plan description</h4>
            <div className="break-all text-sm font-semibold text-gray-800">
              { userData?.currentPlan?.description ? userData?.currentPlan?.description : 'No'}
            </div>
          </div>
          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">Plan package type</h4>
            <div className="break-all text-sm font-semibold text-gray-800">
              {userData?.currentPlan?.packageType ? userData?.currentPlan?.packageType : 'No'}
            </div>
          </div>
          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">Plan price</h4>
            <div className="break-all text-sm font-semibold text-gray-800">
              {userData?.currentPlan?.price ? userData?.currentPlan?.price : 'No'}
            </div>
          </div>
          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">Plan interval count</h4>
            <div className="break-all text-sm font-semibold text-gray-800">
              {userData?.currentPlan?.intervalCount ? userData?.currentPlan?.intervalCount : 'No'}
            </div>
          </div>
          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">Plan offer</h4>
            <div className="break-all text-sm font-semibold text-gray-800">
              {userData?.currentPlan?.offer ? userData?.currentPlan?.offer : 'No'}
            </div>
          </div>

          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">Stripe Customer Id</h4>
            <div className="break-all text-sm font-semibold text-gray-800">
              {userData?.stripeCustomerId ? userData?.stripeCustomerId : 'No'}
            </div>
          </div>
          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">Email Verified</h4>
            <div className="break-all text-sm font-semibold text-gray-800">
              {userData?.isEmailVerified ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">Phone Verified</h4>
            <div className="break-all text-sm font-semibold text-gray-800">
              {userData?.isPhoneVerified ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">Verified</h4>
            <div className="break-all text-sm font-semibold text-gray-800">
              {userData?.isVerified ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">Agreed T&C</h4>
            <div className="break-all text-sm font-semibold text-gray-800">
              {userData?.isAgreedToTermsAndConditions ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">Rejected</h4>
            <div className="break-all text-sm font-semibold text-gray-800">
              {userData?.isRejected ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">Suspended</h4>
            <div className="break-all text-sm font-semibold text-gray-800">
              {userData?.isSuspended ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="block ">
            <h4 className="text-sm font-normal text-gray-500">Deleted</h4>
            <div className="break-all text-sm font-semibold text-gray-800">
              {userData?.isDeleted ? 'Yes' : 'No'}
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default ViewUserDrawer;
