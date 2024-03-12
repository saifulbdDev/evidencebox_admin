/* eslint-disable react-hooks/exhaustive-deps */
'use client'; // This is a client component

import { Dialog } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Buttons/Button';
import Upload from '@/assets/icons/Upload';
import Settings from '@/assets/icons/Settings';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Bars3Icon from '@/assets/icons/Bars3Icon';
import XMarkIcon from '@/assets/icons/XMarkIcon';
import History from '@/assets/icons/History';
import { useSelector } from 'react-redux';
import { MyState } from '@/types/types';
import { useLogoutMutation } from '@/features/auth/authApi';

export default function AdminNavbar() {
  const [logout, { isLoading }] = useLogoutMutation();
  const { accessToken } = useSelector((state: MyState) => state.auth);
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const LogOut = async () => {
    //@ts-ignore
    await logout();
  };

  useEffect(() => {
    if (!accessToken) {
      router.push('/login'); // Redirect to login page if user is not authenticated
    }
  }, [accessToken]);
  return (
    <header className="bg-white z-[20000]">
      <nav
        className="flex items-center z-[100000] justify-between px-3 py-3 mx-auto max-w-7xl"
        aria-label="Global"
      >
        <Link href="/dashboard" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <Image
            src="/logo.svg"
            alt="Vercel Logo"
            className="mx-auto "
            width={300}
            height={57}
            priority
          />
        </Link>
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <div className="items-center hidden md:flex md:gap-x-6">
          <Link
            className="flex text-sm font-semibold leading-6 text-gray-900"
            href="/dashboard/previous-history"
          >
            Previous History
          </Link>
          <Button
            type="button"
            onClick={LogOut}
            className="flex items-center px-3 py-3 text-sm rounded-lg  font-samibold lg:py-2"
          >
            <span className="mr-2">Log Out</span>
            <Upload />
          </Button>
          <Link className="mr-2 W-5" href="/dashboard/profile">
            <Settings />
          </Link>
        </div>
      </nav>

      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                src="/logo.svg"
                alt="Vercel Logo"
                className="mx-auto "
                width={150}
                height={57}
                priority
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flow-root mt-6">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6 space-y-2">
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center text-sm font-semibold text-gray-900"
                  href="/dashboard/previous-history"
                >
                  <History className="w-4 h-4 mr-2" /> <span>Previous History</span>
                </Link>

                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center text-sm font-semibold text-gray-900"
                  href="/dashboard/profile"
                >
                  <Settings className="w-4 h-4 mr-2" /> <span>Settings</span>
                </Link>
              </div>
              <div className="py-6">
                <Button
                  type="button"
                  onClick={LogOut}
                  className="flex items-center px-3 py-3 text-sm rounded-lg  font-samibold lg:py-2"
                >
                  <span className="mr-2">Log Out</span>
                  <Upload />
                </Button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
