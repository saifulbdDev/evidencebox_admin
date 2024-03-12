import * as Yup from 'yup';

const phoneRegExp = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;


export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().min(6).required('Please enter your password'),
  confirmPassword: Yup.string()
    .required('Please Re-enter your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});
export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required.'),
});

export const registerSchema_2 = Yup.object().shape({
  policeState: Yup.string().required('Please select your state'),
  isAgreedToTermsAndConditions: Yup.bool().oneOf([true], 'Field must be checked'),
  policeDepartment: Yup.string().required('Please select your department'),
});

export const registerSchema = Yup.object().shape({
  ID: Yup.string().required('Please enter your id'),
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(25, 'First Name must be at most 25 characters')
    .required('Please enter your first name'),
  lastName: Yup.string().min(2).max(25).required('Please enter your last name'),
  email: Yup.string().email().required('Please enter your email'),
  phone: Yup.string()
    .required('Please enter your Phone')
    .matches(phoneRegExp, 'Phone number is not valid'),
  password: Yup.string().min(6).required('Please enter your password'),
  confirmPassword: Yup.string()
    .required('Please Re-enter your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});
export const searchUserSchema = Yup.object().shape({
  socialSecurityNumber: Yup.string()
    .min(2)
    .max(25)
    .required('Please enter your Social security number'),
  firstName: Yup.string().min(2).max(25).required('Please enter your first name'),
  lastName: Yup.string().min(2).max(25).required('Please enter your last name'),
  email: Yup.string().email().required('Please enter your email'),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});
export const chnagePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().min(6).required('Please enter your old password'),
  newPassword: Yup.string().min(6).required('Please enter your new password'),
  confirmPassword: Yup.string()
    .required('Please Re-enter your password')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});
export const chnageProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(25, 'First Name must be at most 25 characters')
    .required('Please enter your first name'),
  lastName: Yup.string().min(2).max(25).required('Please enter your last name'),
  zip: Yup.string().min(2).max(25).required('Please enter your Zip'),
  city: Yup.string().min(2).max(25).required('Please enter your city'),
  state: Yup.string().min(2).max(25).required('Please enter your state'),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});
export const PasswordSchema  = Yup.object().shape({
  password: Yup.string().min(6).required('Please enter your password'),
});
