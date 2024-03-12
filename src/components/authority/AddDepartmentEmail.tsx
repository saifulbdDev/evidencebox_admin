'use client'; // This is a client component
import Drawer from '../ui/Drawer';
import React from 'react';
import Swal from 'sweetalert2';
import { Formik, Form } from 'formik';
import { addDepartmentEmailSchema } from '@/utils/validations/user';
import { useGetAuthorityDepartmentQuery } from '@/features/authorityDepartment/authorityDepartmentApi';
import { useAddDepartmentEmailMutation } from '@/features/departmentEmail/departmentEmailApi';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Buttons/Button';
import { AuthorityDepartment } from '@/types/department';
type DepartmentEmailProps = {
  open: boolean;
  onClose: () => void;
};

const DepartmentEmail = ({ open, onClose }: DepartmentEmailProps) => {
  const { data, isLoading: isData } = useGetAuthorityDepartmentQuery('');
  const [addDepartmentEmail, { isLoading }] = useAddDepartmentEmailMutation();
  const initialValues = {
    email: '',
    phone: '',
    authorityDepartment: '',
  };

  const submitHandler = async (values: typeof initialValues) => {
    try {
      //@ts-ignore
      delete values.step;
      const response = await addDepartmentEmail(values);

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
        initialValues={initialValues}
        validationSchema={addDepartmentEmailSchema}
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
              label="*Authority Department"
              id="authorityDepartment"
              name="authorityDepartment"
              component="select"
              errorText={errors.authorityDepartment}
              error={touched.authorityDepartment}
              onBlur={handleBlur}
              inputClass="py-2 px-3"
              containerClass="mb-4"
            >
              <option>Select</option>
              {data?.data?.authorityDepartment.length &&
                data?.data?.authorityDepartment.map((type: AuthorityDepartment) => (
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
                  disabled={isValidating || !addDepartmentEmailSchema.isValidSync(values)}
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

export default DepartmentEmail;
