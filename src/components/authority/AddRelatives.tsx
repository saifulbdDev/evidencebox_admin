/* eslint-disable @next/next/no-img-element */
'use client'; // This is a client component
import Drawer from '../ui/Drawer';
import React, { useState, ChangeEvent } from 'react';
import Swal from 'sweetalert2';
import axios from '@/utils/axios';
import { Formik, Form } from 'formik';
import { CloudArrowDownIcon } from '@heroicons/react/24/solid';
import { relativesSchema } from '@/utils/validations/user';
import { UserData } from '@/types/user';
import { useGetRelationTypeQuery } from '@/features/relationtype/relationtypeApi';
import { useDispatch } from 'react-redux';
import { addRelatives } from '@/features/relatives/relativesSlice';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Buttons/Button';
import { useGetUsersQuery } from '@/features/user/userApi';
type RelativesProps = {
  open: boolean;
  onClose: () => void;
};

const Relatives = ({ open, onClose }: RelativesProps) => {
  const dispatch = useDispatch();
  const { data } = useGetRelationTypeQuery('');
  const { data: user } = useGetUsersQuery('');
   //@ts-ignore
  const [file, setFile] = useState<File>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');

  const initialValues = {
    email: '',
    phone: '',
    userId: '',
    relationType: '',
    firstName: '',
    photo: '',
    lastName: '',
  };

  const submitHandler = async (values: typeof initialValues) => {
    setIsLoader(true);

    try {
      const formData = new FormData();
      formData.append('Content-Type', 'multipart/form-data');
      formData.append('photo', file as File);
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('phone', values.phone);
      formData.append('email', values.email);
      formData.append('relationType', values.relationType);
      formData.append('userId', values.userId);
      const response = await axios.post(`/add-relative`, formData);
      if ('error' in response) {
        // Handling error
        Swal.fire({
          title: 'Ops Something went wrong',
          //@ts-ignore
          text: response?.error?.message,
          icon: 'error',
        });

        setIsLoader(false);
      } else if (response.data.status === 'success') {
       
        dispatch(addRelatives(response?.data?.data?.relative));

        //@ts-ignore
        setFile([]);
        setImagePreviewUrl('');
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success',
        });

        onClose();
        setIsLoader(false);
      }
    } catch (err) {
      // Handle error
    }
  };

  const photoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    //@ts-ignore
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result as string);
    };

    reader.readAsDataURL(file);
  };
  return (
    <Drawer className="max-w-md" title="Add Relatives" open={open} onClose={onClose}>
      <Formik
        initialValues={initialValues}
        validationSchema={relativesSchema}
        onSubmit={(values) => submitHandler(values)}
      >
        {({ errors, isValidating, isSubmitting, handleBlur, touched, values }) => (
          <Form>
            <div className="col-span-full flex items-center mb-4">
              <label
                htmlFor="photo-upload"
                className="mx-auto group rounded-full relative  h-32 w-32 border border-gray-300 border-solid"
              >
                <div className="w-full h-full cursor-pointer absolute group-hover:flex items-center justify-center hidden bg-[#ed8383ab] px-1.5 py-1 rounded-full   z-20 left-0  top-0 bottom-0 right-0">
                  <CloudArrowDownIcon className="text-primary-400 bg-white rounded-full px-2 py-1.5 w-12 h-12 " />
                </div>
                <div className="relative">
                  <img
                    alt="new"
                    className="rounded-full h-32 w-32"
                    src={values?.photo || imagePreviewUrl}
                  />
                </div>
                <input id="photo-upload" className="hidden" type="file" onChange={photoUpload} />
              </label>
            </div>
            <div className="grid grid-cols-2 space-x-3">
              <Input
                label="*First Name"
                id="firstName"
                name="firstName"
                type="text"
                errorText={errors.firstName}
                error={touched.firstName}
                onBlur={handleBlur}
                inputClass="py-2 px-3"
                placeholder="First Name"
                containerClass="mb-4"
              />
              <Input
                label="*Last Name"
                id="lastName"
                name="lastName"
                type="text"
                errorText={errors.lastName}
                error={touched.lastName}
                onBlur={handleBlur}
                inputClass="py-2 px-3"
                placeholder="Last Name"
                containerClass="mb-4"
              />
            </div>

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
              label="*Phone"
              id="phone"
              name="phone"
              type="tel"
              errorText={errors.phone}
              error={touched.phone}
              onBlur={handleBlur}
              inputClass="py-2 px-3"
              placeholder="Phone"
              containerClass="mb-4"
            />

            <Input
              label="*Relation Type"
              id="relationType"
              name="relationType"
              component="select"
              errorText={errors.relationType}
              error={touched.relationType}
              onBlur={handleBlur}
              inputClass="py-2 px-3"
              containerClass="mb-4"
            >
              <option>Select</option>
              {data?.data?.length &&
                data?.data?.map((type: any) => (
                  <option key={type.relationName} value={type._id}>
                    {type.relationName}
                  </option>
                ))}
            </Input>
            <Input
              label="*User"
              id="userId"
              name="userId"
              component="select"
              errorText={errors.userId}
              error={touched.userId}
              onBlur={handleBlur}
              inputClass="py-2 px-3"
              containerClass="mb-4"
            >
              <option>Select</option>
              {user?.data?.length &&
                user?.data?.map((user: UserData) => (
                  <option key={user?._id} value={user?._id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
            </Input>

            <footer className="  border-t border-solid w-full px-5 inset-x-px">
              <div className="flex justify-end flex-shrink-0 px-4 py-4 space-x-3">
                <button
                  type="button"
                  className="w-1/2 px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <Button
                  disabled={isValidating || !relativesSchema.isValidSync(values) || !file?.name}
                  isSubmitting={isSubmitting || isLoader}
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

export default Relatives;
