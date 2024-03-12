/* eslint-disable react-hooks/exhaustive-deps */
'use client'; // This is a client component
import Link from 'next/link';
import ArrowRight from '@/assets/icons/ArrowRight';
import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import { forgotPasswordSchema } from '@/utils/validations/auth';
import { useForgotPasswordMutation } from '@/features/auth/authApi';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Buttons/Button';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { MyState } from '@/types/types';

const ForgotPassword = () => {
  const router = useRouter();
  const { accessToken } = useSelector((state: MyState) => state.auth);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const initialValues = {
    email: '',
  };

  const submitHandler = async (values: typeof initialValues) => {
    try {
      const response = await forgotPassword({ ...values, type: 'admin' });

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
        router.push(`/reset-password?email=${values.email}`);
      }
    } catch (err) {
      // Handle error
    }
  };

  useEffect(() => {
    if (accessToken) {
      router.push('/dashboard'); // Redirect to dashboard if user is already logged in
    }
  }, [accessToken]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-2 bg-gray-50 sm:px-0">
      <div className="w-full mx-auto  max-w-[423px]">
        <div className="w-full mb-4">
          {' '}
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
            <Link
              className="group   rounded-full inline-block px-3 hover:bg-primary-300 bg-[#FFEAEA] py-3"
              href={`/login`}
            >
              <ArrowRight className="rotate-180 stroke-primary-400 group-hover:stroke-white" />
            </Link>
            <h2 className="my-2 text-2xl font-bold text-gray-900">Forget Password</h2>
            <p className="text-base text-[#6B7280]">
              Enter your registered email below to receive OTP to set new password
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={forgotPasswordSchema}
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

                <Button
                  isSubmitting={isSubmitting || isLoading}
                  type="submit"
                  disabled={isValidating || !forgotPasswordSchema.isValidSync(values)}
                  className="w-full py-3 text-base rounded-full lg:py-3"
                >
                  Request Reset OTP
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
