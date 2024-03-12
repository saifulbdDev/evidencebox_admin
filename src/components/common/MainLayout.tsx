/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { Fragment, PropsWithChildren, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {   dashboardState} from '@/types/types';
import { Transition } from '@headlessui/react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { useDispatch } from 'react-redux';
import {toggleSidebar} from "@/features/dashboard/dashboardSlice"
const MainLayout = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch()
  const { isSidebar } = useSelector((state: dashboardState) => state.dashboard);
  const [isMobile, setIsMobile] = useState(false);
  function handleResize() {
    if (innerWidth <= 640) {
      dispatch(toggleSidebar(false))
      setIsMobile(true);
    } else {
      dispatch(toggleSidebar(true))
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener('resize', handleResize);
    }

    return () => {
      removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Topbar />
      <Transition
        as={Fragment}
        show={isSidebar}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <Sidebar showNav={isSidebar} />
      </Transition>
      <main
        className={`pt-16 transition-all duration-[400ms] ${isSidebar && !isMobile ? 'pl-56' : ''}`}
      >
        <div className="px-4 mt-8 md:px-8">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
