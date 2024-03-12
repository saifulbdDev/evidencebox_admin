/* eslint-disable react-hooks/exhaustive-deps */
'use client'; // This is a client component

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import OtpInput from '@/components/ui/OtpInput';
import { resetPasswordSchema } from '@/utils/validations/auth';
import Swal from 'sweetalert2';
import { useVerifyLoginMutation } from '@/features/auth/authApi';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Buttons/Button';
import { useSelector } from 'react-redux';
import { MyState } from '@/types/types';

const VerifyLogin = () => {
  const { accessToken } = useSelector((state: MyState) => state.auth);
  const [otp, setOtp] = useState('');
  const [verifyLogin, { isLoading }] = useVerifyLoginMutation();

  const router = useRouter();
  const searchParams = useSearchParams();

  const submitHandler = async () => {
    try {
      const response = await verifyLogin({
        otp: otp,
        email: searchParams?.get('email'),
      });

      if ('error' in response) {
        // Handling error
        Swal.fire({
          title: 'Ops Something went wrong',
          //@ts-ignore
          text: response?.error?.data?.message,
          icon: 'error',
        });
      } else if (response?.data?.status === 'success') {
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success',
        });

        if (response?.data?.data?.accessToken) {
          router.push('/dashboard');
        } else {
          router.push('/login');
        }
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: 'Ops Something went wrong',
        //@ts-ignore
        text: err?.message,
        icon: 'error',
      });
    }
  };

  useEffect(() => {
    if (accessToken) {
      router.push('/dashboard'); // Redirect to login page if user is not authenticated
    }
  }, [accessToken]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-2 bg-gray-50 sm:px-0">
      <div className=" w-full mx-auto  max-w-[424px]">
        <div className="w-full mb-4">
          <Image
            src="/logo.svg"
            alt="Vercel Logo"
            className="mx-auto "
            width={300}
            height={57}
            priority
          />
        </div>

        <div className="px-4 py-12 bg-white rounded-2xl shadow-3xl sm:px-6 md:px-8 lg:px-12">
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Verify it’s you</h2>
            <p className="mt-3 text-sm text-gray">
              We sent a code to ({searchParams?.get('email')}). Enter it here to verify you.
            </p>
          </div>
          <div className="text-center ">
            <OtpInput value={otp} size={5} onChange={(val) => setOtp(val)} />
            <Link href="/login" className="text-base text-center underline ">
              Didn&apos;t get OTP? Try again
            </Link>
            <Button
              disabled={otp.length !== 5 || isLoading}
              type="button"
              onClick={submitHandler}
              className="w-full  mt-3 rounded-full text-base lg:py-3.5 py-3"
            >
              Verify login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyLogin;
