/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client'; // This is a client component
import React, { useState, ChangeEvent } from 'react';
import { CloudArrowDownIcon } from '@heroicons/react/24/solid';
import Drawer from '@/components/ui/Drawer';
import Swal from 'sweetalert2';
import { Formik, Form } from 'formik';
import { updateUserSchema } from '@/utils/validations/user';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Buttons/Button';
import { UserData } from '@/types/user';
import axios from '@/utils/axios';
import { useDispatch } from 'react-redux';
import { updateUsers, updatePolice } from '@/features/user/userSlice';

type UpdateAuthorityDepartmentProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  userData: UserData;
};

const EditProfile = ({ open, onClose, userData, title }: UpdateAuthorityDepartmentProps) => {
  const dispatch = useDispatch();
  //@ts-ignore
  const [file, setFile] = useState<File>([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  const [isLoader, setIsLoader] = useState(false);

  const submitHandler = async (values: typeof userData) => {
    setIsLoader(true);

    try {
      const formData = new FormData();
      formData.append('Content-Type', 'multipart/form-data');
      formData.append('photo', file as File);
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('phone', values.phone);
      formData.append('zip', values.zip);
      formData.append('state', values.state);
      formData.append('city', values.city);
      const response = await axios.put(`/update-profile/${values?._id}`, formData);
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
        if (title === 'Update Profile') {
          dispatch(updateUsers(response?.data?.data));
        } else {
          dispatch(updatePolice(response?.data?.data));
        }
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
    <Drawer className="max-w-md" title={title} open={open} onClose={onClose}>
      <Formik
        initialValues={userData}
        validationSchema={updateUserSchema}
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
            <div className="grid grid-cols-2 space-x-3">
              <Input
                label="*City"
                id="city"
                name="city"
                type="text"
                errorText={errors.city}
                error={touched.city}
                onBlur={handleBlur}
                inputClass="py-2 px-3"
                placeholder="City"
                containerClass="mb-4"
              />
              <Input
                label="*Zip"
                id="zip"
                name="zip"
                type="text"
                errorText={errors.zip}
                error={touched.zip}
                onBlur={handleBlur}
                inputClass="py-2 px-3"
                placeholder="Zip"
                containerClass="mb-4"
              />
            </div>

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
              label="*State"
              id="state"
              name="state"
              type="text"
              errorText={errors.state}
              error={touched.state}
              onBlur={handleBlur}
              inputClass="py-2 px-3"
              placeholder="State"
              containerClass="mb-4"
            />

            <footer className="absolute bottom-0  border-t border-solid w-full px-5 inset-x-px">
              <div className="flex justify-end flex-shrink-0 px-4 py-4 space-x-3">
                <button
                  type="button"
                  className="w-1/2 px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <Button
                  disabled={isValidating || !updateUserSchema.isValidSync(values)}
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

export default EditProfile;
