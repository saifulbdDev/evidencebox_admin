/* eslint-disable react-hooks/exhaustive-deps */
'use client'; // This is a client component

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// external libraries
import { Formik, Form } from 'formik';
import Swal from 'sweetalert2';

// components
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Buttons/Button';

// redux
import { useSelector } from 'react-redux';
import { useLoginMutation } from '@/features/auth/authApi';

// utils
import { loginSchema } from '@/utils/validations/auth';

// types
import { MyState } from '@/types/types';

const Login = () => {
  const router = useRouter();
  const { accessToken } = useSelector((state: MyState) => state.auth);
  const [login, { isLoading }] = useLoginMutation();
  const initialValues = {
    email: '',
    password: '',
  };

  const submitHandler = async (values: typeof initialValues) => {
    try {
      const response = await login(values);

      if ('error' in response) {
        // Handling error
        Swal.fire({
          title: 'Ops Something went wrong',
          //@ts-ignore
          text: response?.error?.data?.message,
          icon: 'error',
        });
      } else if (response?.data?.status === 'success') {
        router.push(`/verify-login?email=${values.email}`);
      }
    } catch (err) {
      // Handle error
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
      router.push('/dashboard'); // Redirect to dashboard if user is already logged in
    }
  }, [accessToken]);

 

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-2 bg-gray-50 sm:px-0">
      <main className={`w-full mx-auto max-w-[423px]`}>
        <section className="w-full mb-4">
          <Image
            src="/logo.svg"
            alt="Vercel Logo"
            className="mx-auto "
            width={300}
            height={57}
            priority
          />
        </section>

        <section className="px-4 py-12 bg-white rounded-2xl shadow-3xl sm:px-6 md:px-8 lg:px-12">
          <div className="mb-4 text-center">
            <h4 className="text-lg font-normal text-gray-500">
              Welcome <b>Back</b>
            </h4>
            <h2 className="text-2xl font-bold text-gray-900">Login as Admin</h2>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={(values) => submitHandler(values)}
          >
            {({ errors, values, isValidating, isSubmitting, handleBlur, touched }) => (
              <Form className="">
                <Input
                  label="*Email"
                  id="email"
                  name="email"
                  type="email"
                  errorText={errors.email}
                  error={touched.email}
                  onBlur={handleBlur}
                  inputClass="py-2 px-3"
                  placeholder="Email"
                  containerClass="mb-4"
                />

                <Input
                  label="*Password"
                  id="password"
                  name="password"
                  type="password"
                  errorText={errors.password}
                  error={touched.password}
                  onBlur={handleBlur}
                  inputClass="py-2 px-3"
                  placeholder="Password"
                  containerClass="relative mb-4"
                />

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 rounded border-primary-300 text-primary-400 focus:ring-primary-300"
                    />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-xs font-normal text-gray-900 font-roboto"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-normal text-gray-900 hover:text-primary-400 font-roboto"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  isSubmitting={isSubmitting || isLoading}
                  type="submit"
                  disabled={isValidating || !loginSchema.isValidSync(values)}
                  className="w-full rounded-full text-base lg:py-3.5 py-3"
                >
                  Log In
                </Button>
              </Form>
            )}
          </Formik>
        </section>
      </main>
    </div>
  );
};
export default Login;
