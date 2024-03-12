'use client'; // This is a client component
import Drawer from '../ui/Drawer';
import React from 'react';
import Swal from 'sweetalert2';
import { Formik, Form } from 'formik';
import { updatePlanSchema } from '@/utils/validations/user';
import { useUpdatePlanMutation } from '@/features/user/userApi';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Buttons/Button';
import { Plan } from '@/types/user';
type UpdatePlanProps = {
  open: boolean;
  onClose: () => void;
  plan: Plan;
};

const UpdatePlan = ({ open, onClose, plan }: UpdatePlanProps) => {
  const [addPlan, { isLoading, isSuccess, error, isError }] = useUpdatePlanMutation();

  const submitHandler = async (values: typeof plan) => {
    try {
      //@ts-ignore
      delete values.step;
      const response = await addPlan(values);

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
    <Drawer className="max-w-md" title="Update Plan" open={open} onClose={onClose}>
      <Formik
        initialValues={plan}
        validationSchema={updatePlanSchema}
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

            {/* <div className="grid grid-cols-2 space-x-3">
              <Input
                label="*Package Type "
                id="packageType"
                name="packageType"
                component="select"
                errorText={errors.packageType}
                error={touched.packageType}
                onBlur={handleBlur}
                inputClass="py-2 px-3"
                containerClass="mb-4"
              >
                <option>Select</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="lifetime">Lifetime</option>
              </Input>
              <Input
                label="*Interval Count"
                id="intervalCount"
                name="intervalCount"
                component="select"
                errorText={errors.intervalCount}
                error={touched.intervalCount}
                onBlur={handleBlur}
                inputClass="py-2 px-3"
                containerClass="mb-4"
              >
                <option>Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="6">6</option>
              </Input>
            </div> */}
            <Input
              label="Offer"
              id="offer"
              name="offer"
              type="text"
              errorText={errors.offer}
              error={touched.offer}
              onBlur={handleBlur}
              inputClass="py-2 px-3"
              placeholder="Offer"
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

            <Button
              disabled={isValidating || !updatePlanSchema.isValidSync(values)}
              isSubmitting={isSubmitting || isLoading}
              type="submit"
              className="w-full  rounded-full text-base lg:py-3.5 py-3"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};

export default UpdatePlan;
