'use client'; // This is a client component
import Drawer from '../ui/Drawer';
import React from 'react';
import Swal from 'sweetalert2';
import { Formik, Form } from 'formik';
import { addAuthorityNotifynSchema } from '@/utils/validations/user';
import { useAddNewsNotifyMutation } from '@/features/newsNotify/newsNotifyApi';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Buttons/Button';

type AddNewsNotifyProps = {
  open: boolean;
  onClose: () => void;
};

const AddNewsNotify = ({ open, onClose }: AddNewsNotifyProps) => {
  const [addNewsNotify, { isLoading, isSuccess, error, isError }] = useAddNewsNotifyMutation();
  const initialValues = {
    title: '',
    description: '',
  };

  const submitHandler = async (values: typeof initialValues) => {
    try {
      //@ts-ignore
      delete values.step;
      const response = await addNewsNotify(values);

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
    <Drawer className="max-w-md" title="Create news notify" open={open} onClose={onClose}>
      <Formik
        initialValues={initialValues}
        validationSchema={addAuthorityNotifynSchema}
        onSubmit={(values) => submitHandler(values)}
      >
        {({ errors, isValidating, isSubmitting, handleBlur, touched, values }) => (
          <Form className="">
            <Input
              label="*Title"
              id="title"
              name="title"
              type="text"
              errorText={errors.title}
              error={touched.title}
              onBlur={handleBlur}
              inputClass="py-2 px-3"
              placeholder="Title"
              containerClass="mb-4"
            />

            <Input
              label="*Description"
              id="description"
              name="description"
              type="text"
              errorText={errors.description}
              error={touched.description}
              onBlur={handleBlur}
              inputClass="py-2 px-3"
              placeholder="Description"
              containerClass="mb-4"
            />
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
                  disabled={isValidating || !addAuthorityNotifynSchema.isValidSync(values)}
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

export default AddNewsNotify;
