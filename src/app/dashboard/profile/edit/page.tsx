/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client'; // This is a client component
import Swal from 'sweetalert2';
import Image from 'next/image';
import axios from '@/utils/axios';
import { useState, ChangeEvent, } from 'react';
import { Formik, Form } from 'formik';
import { chnageProfileSchema } from '@/utils/validations/auth';
import { useGetProfileQuery } from '@/features/auth/authApi';
import Input from '@/components/ui/Input';
import { CloudArrowDownIcon } from '@heroicons/react/24/solid';
import Button from '@/components/ui/Buttons/Button';
import { useRouter } from 'next/navigation';
const UpdatePassword = () => {
  const router = useRouter();
  const { data, isLoading: profileLoader } = useGetProfileQuery('');
  let user = data?.data ?? {};
 
  //@ts-ignore
  const [file, setFile] = useState<File>([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(user?.photo);
  const submitHandler = async (values: typeof user) => {
    var formData = new FormData();
    if (file?.name) {
      formData.append('photo', file as File);
    }

    formData.append('firstName', values?.firstName);
    formData.append('lastName', values?.lastName);
    formData.append('phone', values?.phone);
    formData.append('state', values?.state);
    formData.append('zip', values?.zip);
    formData.append('city', values?.city);

    try {
      const response = await axios.put('auth/profile', formData);

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

  const photoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    //@ts-ignore
    const file = e.target.files[0];
    console.log(file, 'file');
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen ">
      {user?.id && !profileLoader && (
        <div className="w-1/2 mx-auto md:max-w-3/2">
          <div className="py-12 bg-white rounded-2xl shadow-3xl lg:px-12">
            <div className="mb-4 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Profile Update</h2>
            </div>
            <Formik
              initialValues={user}
              validationSchema={chnageProfileSchema}
              onSubmit={(values, { resetForm }) => submitHandler(values)}
            >
              {({ errors, values, isValidating, isSubmitting, handleBlur, touched }) => (
                <Form className="">
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
                          width={100}
                          height={100}
                          alt="new"
                          className="rounded-full h-32 w-32"
                          src={imagePreviewUrl ? imagePreviewUrl : user?.photo}
                        />
                      </div>
                      <input
                        id="photo-upload"
                        className="hidden"
                        type="file"
                        onChange={photoUpload}
                      />
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

                  <Button
                    isSubmitting={isSubmitting}
                    type="submit"
                    disabled={isValidating || !chnageProfileSchema.isValidSync(values)}
                    className="w-full  rounded-full text-base lg:py-3.5 py-3"
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};
export default UpdatePassword;
