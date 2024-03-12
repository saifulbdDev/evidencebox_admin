/* eslint-disable react-hooks/exhaustive-deps */
'use client'; // This is a client component
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import Button from '@/components/ui/Buttons/Button';
import { MyState } from '@/types/types';
export default function Example() {
  const { accessToken } = useSelector((state: MyState) => state.auth);
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (accessToken && pathname === '/') {
      router.push('/dashboard');
    } else if (pathname === '/') {
      router.push('/login');
    }
  }, [pathname]);

  return (
    <header className="bg-white">
      <nav
        className="flex items-center justify-between py-3 mx-auto max-w-7xl lg:px-2"
        aria-label="Global"
      >
        <Link href="/" className="-m-1.5 p-1.5">
          {/* <span className="sr-only">Your Company</span> */}
          <Image
            src="/logo.svg"
            alt="Vercel Logo"
            className="mx-auto "
            width={300}
            height={57}
            priority
          />
        </Link>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            {/* <Bars3Icon className="w-6 h-6" aria-hidden="true" /> */}
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Button
            type="button"
            className="w-full px-3 py-3 text-base font-bold rounded-full lg:py-2"
          >
            Contact Police
          </Button>
        </div>
      </nav>
    </header>
  );
}
