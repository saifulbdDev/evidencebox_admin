'use client'; // This is a client component
import Drawer from '../ui/Drawer';
import React from 'react';
import Swal from 'sweetalert2';
import { Formik, Form } from 'formik';
import { addAuthorityStatenSchema } from '@/utils/validations/user';
import { useGetAuthorityNotifyQuery } from '@/features/department/departmentApi';
import { useAddAuthorityStateMutation } from '@/features/authorityState/authorityStateApi';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Buttons/Button';
import { AuthorityNotify } from '@/types/department';
type AddAuthorityStateProps = {
  open: boolean;
  onClose: () => void;
};

const AddAuthorityState = ({ open, onClose }: AddAuthorityStateProps) => {
  const { data, isLoading: isData } = useGetAuthorityNotifyQuery('');
  const [addAuthorityState, { isLoading, isSuccess, error, isError }] =
    useAddAuthorityStateMutation();
  const initialValues = {
    title: '',
    description: '',
    type: '',
  };

  const submitHandler = async (values: typeof initialValues) => {
    try {
      //@ts-ignore
      delete values.step;
      const response = await addAuthorityState(values);

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
    <Drawer className="max-w-md" title="Create Authority Notify" open={open} onClose={onClose}>
      <Formik
        initialValues={initialValues}
        validationSchema={addAuthorityStatenSchema}
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

            <Input
              label="*Authority Notify Type"
              id="type"
              name="type"
              component="select"
              errorText={errors.type}
              error={touched.type}
              onBlur={handleBlur}
              inputClass="py-2 px-3"
              containerClass="mb-4"
            >
              <option>Select</option>
              {data?.data?.length &&
                data?.data.map((type: AuthorityNotify) => (
                  <option key={type.title} value={type.title}>
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
                  disabled={isValidating || !addAuthorityStatenSchema.isValidSync(values)}
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

export default AddAuthorityState;
