'use client'; // This is a client component
import Drawer from '../ui/Drawer';
import React from 'react';
import Swal from 'sweetalert2';
import { Formik, Form } from 'formik';
import { addNewsEmailSchema } from '@/utils/validations/user';
import { useGetNewsNotifyQuery } from '@/features/newsNotify/newsNotifyApi';
import { useUpdateNewsEmailMutation } from '@/features/newsEmail/newsEmailApi';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Buttons/Button';
import { NewsEmail, AuthorityNotify } from '@/types/department';
type UpdateNewsEmailProps = {
  open: boolean;
  onClose: () => void;
  updateData: NewsEmail;
};

const UpdateNewsEmail = ({ open, onClose, updateData }: UpdateNewsEmailProps) => {
  const { data, isLoading: isData } = useGetNewsNotifyQuery('');
  const [updateNewsEmail, { isLoading, isSuccess, error, isError }] = useUpdateNewsEmailMutation();

  const submitHandler = async (values: typeof updateData) => {
    try {
      //@ts-ignore
      delete values.step;
      const response = await updateNewsEmail(values);

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
        onClose();
      }
    } catch (err) {
      // Handle error
    }
  };
  return (
    <Drawer className="max-w-md" title="Add Department Email" open={open} onClose={onClose}>
      <Formik
        initialValues={updateData}
        validationSchema={addNewsEmailSchema}
        onSubmit={(values) => submitHandler(values)}
      >
        {({ errors, isValidating, isSubmitting, handleBlur, touched, values }) => (
          <Form className="">
            <Input
              label="*Email"
              id="email"
              name="email"
              type="eamil"
              errorText={errors.email}
              error={touched.email}
              onBlur={handleBlur}
              inputClass="py-2 px-3"
              placeholder="Email"
              containerClass="mb-4"
            />

            <Input
              label="*Phone"
              id="phone"
              name="phone"
              type="text"
              errorText={errors.phone}
              error={touched.phone}
              onBlur={handleBlur}
              inputClass="py-2 px-3"
              placeholder="Phone"
              containerClass="mb-4"
            />

            <Input
              label="*News to notify"
              id="newsToNotify"
              name="newsToNotify"
              component="select"
              errorText={errors.newsToNotify}
              error={touched.newsToNotify}
              onBlur={handleBlur}
              inputClass="py-2 px-3"
              containerClass="mb-4"
            >
              <option>Select</option>
              {data?.data?.newsToNotify.length &&
                data?.data?.newsToNotify.map((type: AuthorityNotify) => (
                  <option key={type.title} value={type._id}>
                    {type.title}
                  </option>
                ))}
            </Input>

            <footer className="fixed bottom-0  border-t border-solid w-full px-5 inset-x-px">
              <div className="flex  flex-shrink-0 justify-end px-4 space-x-3  py-4">
                <button
                  type="button"
                  className="rounded-lg w-1/2 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <Button
                  disabled={isValidating}
                  isSubmitting={isSubmitting || isLoading}
                  type="submit"
                  className=" px-6  rounded-lg w-1/2 text-base lg:py-2 py-2"
                >
                  Submit
                </Button>
              </div>
            </footer>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};

export default UpdateNewsEmail;
