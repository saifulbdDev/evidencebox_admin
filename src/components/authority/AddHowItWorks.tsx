'use client'; // This is a client component
import Drawer from '../ui/Drawer';
import React, { useState, ChangeEvent } from 'react';

import Image from 'next/image';
import Swal from 'sweetalert2';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Formik, FieldArray, Form } from 'formik';
import { howItWorksSchema } from '@/utils/validations/user';
import axios from '@/utils/axios';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Buttons/Button';

type AddHowItWorksProps = {
  open: boolean;
  onClose: () => void;
 
};

const AddHowItWorks = ({ open, onClose }: AddHowItWorksProps) => {
  
  const initialValues = {
    description:[''],
    video: '',
  
  };
  const [video, setVideo] = useState<File | null>(null);


  const onChangeVideoHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setVideo(selectedFile);
    }
  };
  const submitHandler = async (values: typeof initialValues) => {
    try {
      const formData = new FormData();
      formData.append('Content-Type', 'multipart/form-data');
      if (video?.name) {
        formData.append('video', video as File);
      }
      values?.description.forEach((element: any, i: number) => {
        formData.append(`description[${i}]`, element);
      });

      const response = await axios.post('/how-it-works', formData);

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
    <Drawer className="max-w-md" title="Add how It Works" open={open} onClose={onClose}>
      <Formik
        initialValues={initialValues}
        validationSchema={howItWorksSchema}
        onSubmit={(values) => submitHandler(values)}
      >
        {({ errors, isValidating, isSubmitting, handleBlur, touched, values }) => (
          <Form className="">
            {/* @ts-ignore */}
            <FieldArray name="description">
              {({ insert, remove, push }) => (
                <>
                  {values.description.map((_: any, index: number) => (
                    <div key={index} className="flex items-center space-x-3 justify-center">
                      <Input
                        label={`*Description ${index + 1}`}
                     
                        type="text"
                        name={`description.${index}`}
                        id={`description.${index}`}
                        errorText={errors.description?.[index]}
                          /* @ts-ignore */
                        error={touched.description?.[index]}
                        onBlur={handleBlur}
                        inputClass="py-2 px-3"
                        placeholder="Description"
                        containerClass="mb-4 w-3/4"
                      />
                      <button
                        className=" bg-gray-200 group hover:bg-primary-200 px-2 py-1.5 rounded mt-1"
                        onClick={() => remove(index)}
                      >
                        <TrashIcon className="h-4 w-4 group-hover:text-white text-gray-600 hover:text-priamry-400" />
                      </button>
                    </div>
                  ))}
                  <Button
                    className="px-2 ml-auto mr-16 mb-3 py-1.5 flex items-center justify-start text-right rounded-lg"
                    onClick={() => push('')}
                  >
                    {' '}
                    <PlusIcon className="h-5 w-5 text-white mr-1  hover:text-priamry-400" /> Add
                    Description
                  </Button>
                </>
              )}
            </FieldArray>
          
            <div className="col-span-full mt-5">
              <div className="px-6 py-10 mt-2 border rounded-lg btn-gradient-1">
                <label htmlFor="video-upload" className="text-center cursor-pointer">
                  <Image
                    src="/upload.svg"
                    className="mx-auto mb-3"
                    width={40}
                    height={40}
                    alt="upload"
                  />
                  <input
                    id="video-upload"
                    accept="video/*"
                    onChange={onChangeVideoHandler}
                    name="video-upload"
                    type="file"
                    className="sr-only"
                  />
                  <p className="text-sm text-gray-900">Click here to upload Video</p>
                </label>
              </div>
              {video?.name ? (
                <div className="flex justify-between mt-2">
                  <div className="flex items-center">
                    <Image
                      src="/attachment.svg"
                      className="mx-auto "
                      width={12}
                      height={12}
                      alt="upload"
                    />
                    <span className="ml-3 text-xs text-[#1E1E1E]">{video?.name}</span>
                  </div>
                  <div>
                    <button onClick={() => setVideo(null)}>
                      <Image
                        src="/remove.svg"
                        className="mx-auto "
                        width={12}
                        height={12}
                        alt="upload"
                      />
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            <footer className=" bottom-0  border-t border-solid w-full px-5 inset-x-px">
              <div className="flex  flex-shrink-0 justify-end px-4 space-x-3  py-4">
                <button
                  type="button"
                  className="rounded-lg w-1/2 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <Button
                  disabled={isValidating || !howItWorksSchema.isValidSync(values) || !video}
                  isSubmitting={isSubmitting}
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

export default AddHowItWorks;
