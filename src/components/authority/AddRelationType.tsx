'use client'; // This is a client component
import Drawer from '../ui/Drawer';
import React from 'react';
import Swal from 'sweetalert2';
import { Formik, Form } from 'formik';
import { relationType } from '@/utils/validations/user';
import { useAddRelationTypeMutation } from '@/features/relationtype/relationtypeApi';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Buttons/Button';

type AddRelationTypeProps = {
  open: boolean;
  onClose: () => void;
};

const AddRelationType = ({ open, onClose }: AddRelationTypeProps) => {
  const [addRelationType, { isLoading }] = useAddRelationTypeMutation();
  const initialValues = {
    relationName: '',
  };

  const submitHandler = async (values: typeof initialValues) => {
    try {
      //@ts-ignore
      delete values.step;
      const response = await addRelationType(values);

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
    <Drawer className="max-w-md" title="Create relation name" open={open} onClose={onClose}>
      <Formik
        initialValues={initialValues}
        validationSchema={relationType}
        onSubmit={(values) => submitHandler(values)}
      >
        {({ errors, isValidating, isSubmitting, handleBlur, touched, values }) => (
          <Form className="">
            <Input
              label="*Relation Name"
              id="relationName"
              name="relationName"
              type="text"
              errorText={errors.relationName}
              error={touched.relationName}
              onBlur={handleBlur}
              inputClass="py-2 px-3"
              placeholder="Relation Name"
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
                  disabled={isValidating || !relationType.isValidSync(values)}
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

export default AddRelationType;
