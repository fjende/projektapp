import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string('')
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password')
});

export const registerValidationSchema = Yup.object({
  firstName: Yup.string('').required('First name is required'),
  lastName: Yup.string('').required('Last name is required'),
  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string('')
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password')
});
