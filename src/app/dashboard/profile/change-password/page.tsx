'use client'; // This is a client component
import Swal from 'sweetalert2';
import { Formik, Form } from 'formik';
import { chnagePasswordSchema } from '@/utils/validations/auth';
import { useChangePasswordMutation } from '@/features/auth/authApi';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Buttons/Button';
import { useRouter } from 'next/navigation';
const UpdatePassword = () => {
  const router = useRouter();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const submitHandler = async (values: typeof initialValues) => {
    try {
      const response = await changePassword(values);
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
          text: response?.data?.message,
          icon: 'success',
        });

        router.push(`/dashboard/profile`);
      }
    } catch (err) {
      // Handle error
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-50">
      <div className="w-1/2 mx-auto md:max-w-[423px]">
        <div className="py-12 bg-white rounded-2xl shadow-3xl lg:px-12">
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Update Password</h2>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={chnagePasswordSchema}
            onSubmit={(values, { resetForm }) => submitHandler(values)}
          >
            {({ errors, values, isValidating, isSubmitting, handleBlur, touched }) => (
              <Form className="">
                <Input
                  label="*Old Password"
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  errorText={errors.oldPassword}
                  error={touched.oldPassword}
                  onBlur={handleBlur}
                  inputClass="py-2 px-3"
                  placeholder="Old Password"
                  containerClass="relative mb-4"
                />
                <Input
                  label="*New Password"
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  errorText={errors.newPassword}
                  error={touched.newPassword}
                  onBlur={handleBlur}
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
                  onBlur={handleBlur}
                  inputClass="py-2 px-3"
                  placeholder="Confirm Password"
                  containerClass="relative mb-4"
                />

                <Button
                  isSubmitting={isSubmitting || isLoading}
                  type="submit"
                  disabled={isValidating || !chnagePasswordSchema.isValidSync(values)}
                  className="w-full  rounded-full text-base lg:py-3.5 py-3"
                >
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default UpdatePassword;
