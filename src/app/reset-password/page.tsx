/* eslint-disable react-hooks/exhaustive-deps */
'use client'; // This is a client component

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import OtpInput from '@/components/ui/OtpInput';
import { resetPasswordSchema } from '@/utils/validations/auth';
import Swal from 'sweetalert2';
import {
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
} from '@/features/auth/authApi';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Buttons/Button';
import { useSelector } from 'react-redux';
import { MyState } from '@/types/types';
const ResetPassword = () => {
  const { accessToken } = useSelector((state: MyState) => state.auth);
  const [otp, setOtp] = useState('');
  const [isOtp, isSetOtp] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const initialValues = {
    confirmPassword: '',
    password: '',
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get('email');

  const submitHandler = async (values: typeof initialValues) => {
    try {
      const response = await resetPassword({
        ...values,
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
        router.push('/login');
      }
    } catch (err) {}
  };
  const chackOtp = async () => {
    try {
      const response = await verifyOtp({ email: email, otp: otp });
      if ('error' in response) {
        // Handling error
        Swal.fire({
          title: 'Ops Something went wrong',
          //@ts-ignore
          text: response?.error?.data?.message,
          icon: 'error',
        });
      } else if (response.data.status === 'success') {
        isSetOtp(true);
        // Success message
      }
    } catch (err) {
      // Handle error
    }
  };
  const resendCode = async () => {
    try {
      const response = await forgotPassword({ email: email, type: 'admin' });

      if ('error' in response) {
        // Handling error
        Swal.fire({
          title: 'Ops Something went wrong',
          //@ts-ignore
          text: response?.error?.data?.message,
          icon: 'error',
        });
      } else if (response.data.status === 'success') {
        // Success message
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success',
        });
      }
    } catch (err) {
      // Handle error
    }
  };
  useEffect(() => {
    if (accessToken) {
      router.push('/dashboard'); // Redirect to dashboard page
    }
  }, [accessToken]);
  useEffect(() => {
    if (!email) {
      router.push('/forgot-password'); // Redirect to login page if user is not authenticated
    }
  }, [email]);
  return (
    <div className="bg-gray-50 flex flex-col items-center sm:px-0 px-2 justify-center min-h-screen w-full">
      <div className=" w-full mx-auto  max-w-[424px]">
        <div className="w-full mb-4">
          {' '}
          <Image
            src="/logo.svg"
            alt="Vercel Logo"
            className=" mx-auto"
            width={300}
            height={57}
            priority
          />
        </div>
        {otp.length > 4 && isOtp ? (
          <div className="py-12 rounded-2xl bg-white  shadow-3xl px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="mb-4 text-center">
              <h2 className="text-gray-900 text-2xl font-bold">Set you password</h2>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={resetPasswordSchema}
              onSubmit={(values) => submitHandler(values)}
            >
              {({
                values,
                errors,
                handleChange,
                isValidating,
                isSubmitting,
                handleBlur,
                touched,
              }) => (
                <Form className="">
                  <Input
                    label="*New Password"
                    id="password"
                    name="password"
                    type="password"
                    errorText={errors.password}
                    error={touched.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputClass="py-2 px-3"
                    placeholder="New Password"
                    containerClass="relative mb-4"
                  />
                  <Input
                    label="*Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    errorText={errors.confirmPassword}
                    error={touched.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputClass="py-2 px-3"
                    placeholder="Confirm Password"
                    containerClass="relative mb-4"
                  />

                  <Button
                    isSubmitting={isSubmitting || isLoading}
                    type="submit"
                    disabled={isValidating || !resetPasswordSchema.isValidSync(values)}
                    className="w-full  rounded-full text-base lg:py-3.5 py-3"
                  >
                    Save
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <div className="py-12 rounded-2xl bg-white  shadow-3xl px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="mb-4 text-center">
              <h2 className="text-gray-900 text-2xl font-bold">Verify it’s you</h2>
              <p className="text-gray text-sm mt-3">
                We sent a code to ({searchParams?.get('email')}). Enter it here to verify you.
              </p>
            </div>
            <div className="text-center ">
              <OtpInput
                value={otp}
                size={5}
                onChange={(val) => {
                  setOtp(val);
                }}
              />
              <button
                onClick={resendCode}
                className="text-base text-primary-300 text-center underline "
              >
                Resend Code
              </button>
              <Button
                disabled={otp.length !== 5}
                type="button"
                onClick={chackOtp}
                className="w-full  mt-3 rounded-full text-base lg:py-3.5 py-3"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ResetPassword;
