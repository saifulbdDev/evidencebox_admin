'use client'; // This is a client component
import Drawer from '../ui/Drawer';
import React from 'react';
import Swal from 'sweetalert2';
import { Formik, Form } from 'formik';
import { authorityDepartmentnSchema } from '@/utils/validations/user';
import { useGetAuthorityStateQuery } from '@/features/authorityState/authorityStateApi';
import { useGetAuthorityNotifyQuery } from '@/features/department/departmentApi';
import { useUpdateAuthorityDepartmentMutation } from '@/features/authorityDepartment/authorityDepartmentApi';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Buttons/Button';
import { AuthorityDepartment, AuthorityState, AuthorityNotify } from '@/types/department';
type UpdateAuthorityDepartmentProps = {
  open: boolean;
  onClose: () => void;
  updateData: AuthorityDepartment;
};

const UpdateAuthorityDepartment = ({
  open,
  onClose,
  updateData,
}: UpdateAuthorityDepartmentProps) => {
  const { data, isLoading: isData } = useGetAuthorityNotifyQuery('');
  const { data: stateOfDepartments } = useGetAuthorityStateQuery('');
  const [updateAuthorityDepartment, { isLoading, isSuccess, error, isError }] =
    useUpdateAuthorityDepartmentMutation();

  const submitHandler = async (values: typeof updateData) => {
    try {
      //@ts-ignore
      delete values.step;
      const response = await updateAuthorityDepartment(values);

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
    <Drawer className="max-w-md" title="Update Authority Department" open={open} onClose={onClose}>
      <Formik
        initialValues={updateData}
        validationSchema={authorityDepartmentnSchema}
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
              label="*Authority notify type"
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
              {data?.data.length &&
                data?.data.map((type: AuthorityNotify) => (
                  <option key={type.title} value={type.title}>
                    {type.title}
                  </option>
                ))}
            </Input>
            <Input
              label="*State of department"
              id="stateOfDepartment"
              name="stateOfDepartment"
              component="select"
              errorText={errors.stateOfDepartment}
              error={touched.stateOfDepartment}
              onBlur={handleBlur}
              inputClass="py-2 px-3"
              containerClass="mb-4"
            >
              <option>Select</option>
              {stateOfDepartments?.data?.authorityState?.length &&
                stateOfDepartments?.data?.authorityState.map((authorityState: AuthorityState) => (
                  <option key={authorityState.title} value={authorityState.title}>
                    {authorityState.title}
                  </option>
                ))}
            </Input>

            <footer className="fixed bottom-0 w-full px-5 border-t border-solid inset-x-px">
              <div className="flex justify-end flex-shrink-0 px-4 py-4 space-x-3">
                <button
                  type="button"
                  className="w-1/2 px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <Button
                  disabled={isValidating || !authorityDepartmentnSchema.isValidSync(values)}
                  isSubmitting={isSubmitting || isLoading}
                  type="submit"
                  className="w-1/2 px-6 py-2 text-base rounded-lg lg:py-2"
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

export default UpdateAuthorityDepartment;
