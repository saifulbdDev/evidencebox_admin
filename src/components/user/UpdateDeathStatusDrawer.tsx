'use client'; // This is a client component
import React, { useState, useEffect, ChangeEvent } from 'react';
import Drawer from '@/components/ui/Drawer';
import Swal from 'sweetalert2';
import { Formik, Form } from 'formik';
import { updateDeathStatusSchema } from '@/utils/validations/user';
import { useUpdateAuthorityDepartmentMutation } from '@/features/authorityDepartment/authorityDepartmentApi';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Buttons/Button';
import { UserData } from '@/types/user';
import Image from 'next/image';
import axios from '@/utils/axios';
import { useDispatch } from 'react-redux';
import { updateUsers } from '@/features/user/userSlice';

type UpdateAuthorityDepartmentProps = {
  open: boolean;
  onClose: () => void;
  userData: UserData;
};

const UpdateDeathStatusDrawer = ({ open, onClose, userData }: UpdateAuthorityDepartmentProps) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [isLoader, setIsLoader] = useState(false);
  const [message, setMessage] = useState('');
  const [updateAuthorityDepartment, { isLoading, isSuccess, error, isError }] =
    useUpdateAuthorityDepartmentMutation();
  const userId = userData._id || '';

  const initialValues = {
    deathDate: '',
    deathStatusUpdateNote: '',
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const submitHandler = async (values: typeof initialValues) => {
    setIsLoader(true);

    try {
      const formData = new FormData();
      formData.append('Content-Type', 'multipart/form-data');
      formData.append('deathCertificate', file as File);
      formData.append('deathDate', values.deathDate);
      formData.append('deathStatusUpdateNote', values.deathStatusUpdateNote);
      formData.append('userId', userId as string);

      // console.log('formData', {
      //   deathCertificate: file,
      //   deathDate: values.deathDate,
      //   deathStatusUpdateNote: values.deathStatusUpdateNote,
      //   userId: userId,
      // });

      const response = await axios.put('/update-death-status', formData);

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
        setMessage(response.data.message);
        dispatch(updateUsers(response?.data?.data));

        // Success message
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

  return (
    <Drawer className="max-w-md" title="Update Death Status" open={open} onClose={onClose}>
      <Formik
        initialValues={initialValues}
        validationSchema={updateDeathStatusSchema}
        onSubmit={(values) => submitHandler(values)}
      >
        {({ errors, isValidating, isSubmitting, handleBlur, touched, values }) => (
          <Form>
            <Input
              label="*Death Date"
              id="deathDate"
              name="deathDate"
              type="date"
              errorText={errors.deathDate}
              error={touched.deathDate}
              onBlur={handleBlur}
              inputClass="py-2 px-3"
              placeholder="Death Date"
              containerClass="mb-4"
              // min={new Date().toISOString().split('T')[0]}
              max={new Date().toISOString().split('T')[0]}
            />

            <Input
              label="Death Status Update Note"
              id="deathStatusUpdateNote"
              name="deathStatusUpdateNote"
              type="text"
              errorText={errors.deathStatusUpdateNote}
              error={touched.deathStatusUpdateNote}
              onBlur={handleBlur}
              inputClass="py-2 px-3"
              placeholder="Death Status Update Note"
              containerClass="mb-4"
              component="textarea"
            />

            <div className="col-span-full">
              <div className="px-6 py-10 mt-2 border rounded-lg btn-gradient-1">
                <label htmlFor="file-upload" className="text-center cursor-pointer">
                  <Image
                    src="/upload.svg"
                    className="mx-auto mb-3"
                    width={40}
                    height={40}
                    alt="upload"
                  />
                  <input
                    id="file-upload"
                    onChange={onChangeHandler}
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                  <p className="text-sm text-gray-900">Click here to upload Death Certificate</p>
                </label>
              </div>
              {file ? (
                <div className="flex justify-between mt-2">
                  <div className="flex items-center">
                    <Image
                      src="/attachment.svg"
                      className="mx-auto "
                      width={12}
                      height={12}
                      alt="upload"
                    />
                    <span className="ml-3 text-xs text-[#1E1E1E]">{file?.name}</span>
                  </div>
                  <div>
                    <button onClick={() => setFile(null)}>
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

            {/* <div className="w-1/2 mx-auto">
            <Button
              isSubmitting={isLoader}
              disabled={!file}
              type="button"
              onClick={submitHandler}
              className="w-full mt-  rounded-full text-base lg:py-3.5 py-3"
            >
              Submit
            </Button>
          </div> */}

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
                  disabled={!file || isValidating || !updateDeathStatusSchema.isValidSync(values)}
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

export default UpdateDeathStatusDrawer;
