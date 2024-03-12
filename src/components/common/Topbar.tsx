'use client';

import { Fragment, useEffect } from 'react';
import Link from 'next/link';
import {
  Bars3CenterLeftIcon,
  PencilIcon,
  UserIcon,
  ChevronDownIcon,
  CreditCardIcon,
  Cog8ToothIcon,
} from '@heroicons/react/24/solid';

import { Menu, Transition, } from '@headlessui/react';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useLogoutMutation } from '@/features/auth/authApi';
import { MyState,  dashboardState} from '@/types/types';
import Button from '@/components/ui/Buttons/Button';
import Upload from '@/assets/icons/Upload';
import SettingsIcon from '@/assets/icons/Settings';
import { useDispatch } from 'react-redux';
import {toggleSidebar} from "@/features/dashboard/dashboardSlice"

const Topbar = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const { accessToken } = useSelector((state: MyState) => state.auth);
  const { isSidebar } = useSelector((state: dashboardState) => state.dashboard);
  const [logout, { isLoading }] = useLogoutMutation();

  const LogOut = async () => {
    //@ts-ignore
    await logout();
  };

  useEffect(() => {
    if (!accessToken) {
      router.push('/login'); // Redirect to login page if user is not authenticated
    }
  }, [accessToken, router]);

  return (
    <nav
      className={`fixed w-full z-50 h-16 flex justify-between items-center transition-all duration-[400ms] bg-white ${
        isSidebar ? 'pl-56' : ''
      }`}
    >
      <div className="pl-4 md:pl-16">
        <Bars3CenterLeftIcon
          className="z-10 w-8 h-8 text-gray-700 cursor-pointer"
          onClick={() => dispatch(toggleSidebar(!isSidebar))}
        />
      </div>
    

      <main className="items-center hidden pr-4 md:flex md:gap-x-6 md:pr-16">
        <Button
          type="button"
          onClick={LogOut}
          className="flex items-center px-3 py-3 text-sm rounded-lg font-samibold lg:py-2"
        >
          <span className="mr-2">Log Out</span>
          <Upload />
        </Button>
      

        <Menu as="div" className="relative inline-block text-left">
          <div className="flex items-center">
            <Menu.Button className="inline-flex items-center justify-center w-full">
              <SettingsIcon />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Menu.Items className="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white rounded shadow-sm">
              <div className="px-1 py-4">
                <Menu.Item>
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center p-2 text-sm text-gray-700 transition-colors rounded hover:bg-orange-500 hover:text-white group"
                  >
                    {/* <PencilIcon className="w-4 h-4 mr-2" /> */}
                    {/* profile view icon */}
                    <UserIcon className="w-4 h-4 mr-2" />
                    View profile
                  </Link>
                </Menu.Item>

                <Menu.Item>
                  <Link
                    href="/dashboard/profile/edit"
                    className="flex items-center p-2 text-sm text-gray-700 transition-colors rounded hover:bg-orange-500 hover:text-white group"
                  >
                    <PencilIcon className="w-4 h-4 mr-2" />
                    Edit profile
                  </Link>
                </Menu.Item>

                <Menu.Item>
                  <Link
                    href="/dashboard/profile/change-password"
                    className="flex items-center p-2 text-sm text-gray-700 transition-colors rounded hover:bg-orange-500 hover:text-white group"
                  >
                    <Cog8ToothIcon className="w-4 h-4 mr-2" />
                    Change password
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </main>
    </nav>
  );
};

export default Topbar;
