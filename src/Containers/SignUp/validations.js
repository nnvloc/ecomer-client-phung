import {validateEmail} from '../../utils/validation';

export const validateSignUpForm = (info) => {
  const {firstName, lastName, email, password} = info;
  const errors = {};
  if (!firstName) {
    errors.firstName = 'This field is requried';
  }
  if (!lastName) {
    errors.lastName = 'This field is requried';
  }
  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  if (!password) {
    errors.password= 'This field is required';
  }

  return errors;
}
