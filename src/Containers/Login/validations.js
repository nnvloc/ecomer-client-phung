import {validateEmail} from '../../utils/validation';

export const validateLogInForm = (info) => {
  const {email, password} = info;
  const errors = {};
  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  if (!password) {
    errors.password= 'This field is required';
  }

  return errors;
}
