const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length < 4) {
    errors.username = 'Minimum be 4 characters or more';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length < 4) {
    errors.name = 'Minimum be 4 characters or more';
  }

  if (!values.phone) {
    errors.phone = 'Required';
  } else if (!/^01[0125][0-9]{8}$/i.test(values.phone)) {
    errors.phone = 'Phone must be 11 digets start with 010,011,012,015';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/i.test(values.password)) {
    errors.password =
      'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Confirm password is not matched';
  }
  return errors;
};

export default validate;
