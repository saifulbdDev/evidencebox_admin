// @ts-nocheck

import { forwardRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Disclosure } from '@headlessui/react';
import {
  InformationCircleIcon,
  FolderIcon,
  HomeIcon,
  HomeModernIcon,
  CreditCardIcon,
  UserIcon,
  ChevronUpIcon,
  InboxArrowDownIcon,
  EnvelopeIcon,
  BriefcaseIcon,
  Square3Stack3DIcon,
  NewspaperIcon,
  ViewColumnsIcon,
  RectangleStackIcon
} from '@heroicons/react/24/solid';

type SidebarProps = {
  showNav: boolean;
};

const Sidebar = forwardRef(({ showNav }: SidebarProps, ref) => {
  const pathname = usePathname();

  const SidebarLink = ({
    href,
    icon,
    label,
  }: {
    href: string;
    icon?: React.ElementType;
    label: string;
  }) => (
    <Link href={href}>
      <div
        className={`pl-6 py-3 mb-1 rounded text-center cursor-pointer flex items-center transition-colors ${
          pathname === href
            ? 'bg-orange-100 text-orange-500'
            : 'text-gray-400 hover:bg-orange-100 hover:text-orange-500'
        }`}
      >
        <div className="mr-2">{icon ? icon : <UserIcon className="w-5 h-5" />}</div>
        <div>
          <p>{label}</p> <p> {pathname === href}</p>
        </div>
      </div>
    </Link>
  );

  return (
    <div
      ref={ref}
      className="fixed top-0 bottom-0 w-56 h-full overflow-hidden overflow-y-auto bg-white shadow-sm z-[51]"
    >
      <div className="flex justify-center mt-6 mb-14">
        <Link href="/dashboard" className="-m-1.5 p-1.5">
          <Image
            src="/logo.svg"
            alt="company Logo"
            className="mx-auto"
            width={150}
            height={57}
            priority
          />
        </Link>
      </div>

      <div className="flex flex-col px-2">
        <SidebarLink
          href="/dashboard/"
          icon={<HomeIcon className="w-5 h-5 " />}
          label="Dashboard"
        />
        <SidebarLink
          href="/dashboard/how-it-works/"
          icon={<BriefcaseIcon className="w-5 h-5 " />}
          label="How It Works"
        />
        <SidebarLink
          href="/dashboard/evidence-data/"
          icon={<RectangleStackIcon className="w-5 h-5 " />}
          label="Evidence Data"
        />

        <section className="w-full">
          <div className="w-full max-w-md mx-auto bg-white rounded-2xl">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`${open ? 'ring-red-500 text-red-600':' text-red-900'} focus-visible:ring-red-500 flex justify-between w-full px-4 py-2 text-sm font-medium text-left bg-red-100 rounded-lg hover:bg-red-200 focus:outline-none focus-visible:ring  focus-visible:ring-opacity-75`}
                  >
                    <span>User</span>
                    <ChevronUpIcon
                      className={`${
                        open ? 'rotate-180 transform text-red-500' : ' text-red-900' 
                      } h-5 w-5`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                    <SidebarLink
                      href="/dashboard/users/"
                      icon={<UserIcon className="w-5 h-5" />}
                      label="Users"
                    />
                    <SidebarLink
                      href="/dashboard/deleted-users/"
                      icon={<UserIcon className="w-5 h-5" />}
                      label="Deleted users"
                    />
                    <SidebarLink
                      href="/dashboard/plans/"
                      icon={<ViewColumnsIcon className="w-5 h-5" />}
                      label="Plans"
                    />
                    <SidebarLink
                      href="/dashboard/payments/"
                      icon={<CreditCardIcon className="w-5 h-5" />}
                      label="Payments"
                    />
                    <SidebarLink
                      href="/dashboard/relation-type/"
                      icon={<CreditCardIcon className="w-5 h-5" />}
                      label="Relation type"
                    />
                    <SidebarLink
                      href="/dashboard/relatives/"
                      icon={<CreditCardIcon className="w-5 h-5" />}
                      label="relatives"
                    />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                 <Disclosure.Button
                    className={`${open ? 'ring-red-500 text-red-600':' text-red-900'} focus-visible:ring-red-500 flex justify-between w-full px-4 py-2 text-sm font-medium text-left bg-red-100 rounded-lg hover:bg-red-200 focus:outline-none focus-visible:ring  focus-visible:ring-opacity-75`}
                  >
                    <span>Police</span>
                    <ChevronUpIcon
                      className={`${
                        open ? 'rotate-180 transform text-red-500' : ' text-red-900' 
                      } h-5 w-5`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                    <SidebarLink href="/dashboard/polices/" label="Polices" />
                    <SidebarLink
                      href="/dashboard/file-access/"
                      icon={<FolderIcon className="w-5 h-5" />}
                      label="File Access"
                    />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                <Disclosure.Button
                    className={`${open ? 'ring-red-500 text-red-600':' text-red-900'} focus-visible:ring-red-500 flex justify-between w-full px-4 py-2 text-sm font-medium text-left bg-red-100 rounded-lg hover:bg-red-200 focus:outline-none focus-visible:ring  focus-visible:ring-opacity-75`}
                  >
                    <span>Authority</span>
                    <ChevronUpIcon
                      className={`${
                        open ? 'rotate-180 transform text-red-500' : ' text-red-900' 
                      } h-5 w-5`}
                    />
                  </Disclosure.Button>

                  <Disclosure.Panel className="text-sm text-gray-500">
                    <SidebarLink
                      href="/dashboard/authority-notify/"
                      icon={<InformationCircleIcon className="w-5 h-5" />}
                      label="Authority To Notify"
                    />
                    <SidebarLink
                      href="/dashboard/authority-state/"
                      icon={<HomeModernIcon className="w-5 h-5" />}
                      label="State"
                    />
                    <SidebarLink
                      href="/dashboard/authority-department/"
                      icon={<Square3Stack3DIcon className="w-5 h-5" />}
                      label="Department"
                    />
                    <SidebarLink
                      href="/dashboard/authority-department-email/"
                      icon={<InboxArrowDownIcon className="w-5 h-5" />}
                      label="Department Email"
                    />
                    <SidebarLink
                      href="/dashboard/news-to-notify/"
                      icon={<NewspaperIcon className="w-5 h-5" />}
                      label="News To Notify"
                    />
                    <SidebarLink
                      href="/dashboard/news-authority-email/"
                      icon={<EnvelopeIcon className="w-5 h-5" />}
                      label="News Authority Email"
                    />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </section>
      </div>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
