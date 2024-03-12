import * as Yup from 'yup';

const phoneRegExp = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

export const addPlanSchema = Yup.object().shape({
  title: Yup.string().min(2).required('Please enter your title'),
  price: Yup.number().required('Please enter your price'),
  description: Yup.string().min(2).required('Please enter your description'),
  packageType: Yup.string().required('Please select your package Type'),
  intervalCount: Yup.string().required('Please select your interval count'),
});
export const updatePlanSchema = Yup.object().shape({
  title: Yup.string().min(2).required('Please enter your title'),
  price: Yup.string().min(2).required('Please enter your price'),
  description: Yup.string().min(2).required('Please enter your description'),
});
export const addAuthorityNotifynSchema = Yup.object().shape({
  title: Yup.string().min(2).required('Please enter your title'),
  description: Yup.string().min(2).required('Please enter your description'),
});

export const addAuthorityStatenSchema = Yup.object().shape({
  title: Yup.string().min(2).required('Please enter your title'),
  description: Yup.string().min(2).required('Please enter your description'),
  type: Yup.string().required('Please select your Type'),
});
export const authorityDepartmentnSchema = Yup.object().shape({
  title: Yup.string().min(2).required('Please enter your title'),
  description: Yup.string().min(2).required('Please enter your description'),
  stateOfDepartment: Yup.string().required('Please select your State'),
  type: Yup.string().required('Please select your Type'),
});
export const addDepartmentEmailSchema = Yup.object().shape({
  email: Yup.string().email().required('Please enter your email'),
  phone: Yup.string()
    .required('Please enter your Phone')
    .matches(phoneRegExp, 'Phone number is not valid'),
  authorityDepartment: Yup.string().required('Please select your Authority Department'),
});
export const addNewsEmailSchema = Yup.object().shape({
  email: Yup.string().email().required('Please enter your email'),
  phone: Yup.string()
    .required('Please enter your Phone')
    .matches(phoneRegExp, 'Phone number is not valid'),
  newsToNotify: Yup.string().required('Please select your News Notify'),
});
export const relationType = Yup.object().shape({
  relationName: Yup.string().min(2).required('Please enter your relation type'),
});
export const updateDeathStatusSchema = Yup.object().shape({
  deathDate: Yup.date().required('Please enter your Death Date'),
  deathStatusUpdateNote: Yup.string(),
});
export const updateUserSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(25, 'First Name must be at most 25 characters')
    .required('Please enter your first name'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(25, 'Last Name must be at most 25 characters')
    .required('Please enter your last name'),
  email: Yup.string().email().required('Please enter your email'),
  state: Yup.string().required('Please enter your state'),
  zip: Yup.string().min(5).required('Please enter your state'),
  phone: Yup.string()
    .min(7, 'Phone number must be at least 7 characters')
    .required('Please enter your Phone')
    .matches(phoneRegExp, 'Phone number is not valid'),
});
export const relativesSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(25, 'First Name must be at most 25 characters')
    .required('Please enter your first name'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(25, 'Last Name must be at most 25 characters')
    .required('Please enter your last name'),
  email: Yup.string().email().required('Please enter your email'),
  relationType: Yup.string().required('Please enter your relation type'),
  userId: Yup.string().required('Please enter your user'),
  phone: Yup.string()
    .min(7, 'Phone number must be at least 7 characters')
    .required('Please enter your Phone')
    .matches(phoneRegExp, 'Phone number is not valid'),
});

export const howItWorksSchema = Yup.object()
  .shape({
    description: Yup.array().of(Yup.string().required('Please enter your description')),
  })
  .required('Must have description');
