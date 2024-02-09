export const handleRegisterValidation = (values) => {
  let errors = {};
  console.log(values);
  if (!values.username) {
    return (errors.username = "Name is required");
  }
  if (!values.email) {
    return (errors.email = "Email is required");
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    return (errors.email = "Email is invalid");
  }
  if (!values.password) {
    return (errors.password = "Password is required");
  } else if (values.password.length < 6) {
    return (errors.password = "Password must be at least 6 characters");
  }
  if (!values.confirmPassword) {
    return (errors.confirmPassword = "Confirm Password is required");
  } else if (values.confirmPassword !== values.password) {
    return (errors.confirmPassword = "Confirm Password does not match");
  }
  console.log(errors);
  return errors;
};
