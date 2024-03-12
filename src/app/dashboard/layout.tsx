'use client'; // FIXME: testing purpose only, remove this line

import { PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MainLayout from '@/components/common/MainLayout';
import { MyState } from '@/types/types';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const { accessToken } = useSelector((state: MyState) => state.auth);

  useEffect(() => {
    if (!accessToken) {
      router.push('/login');
    }
  }, [accessToken, router]);

  return <MainLayout>{children}</MainLayout>;
}
