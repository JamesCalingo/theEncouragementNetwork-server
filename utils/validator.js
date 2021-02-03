module.exports.validateRegistration = (email, password, confirmPW) => {
  const errors = {};
  if (!email) {
    errors.email = "That is not a valid email address.";
  } else {
    const validEmail = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(validEmail)) {
      errors.email = "That is not a valid email address.";
    }
  }
  if (password.length < 8) {
    errors.password = "Your password must be at least eight characters long.";
  }
  if (confirmPW != password) {
    errors.password = "Passwords do not match";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLogin = (email, password) => {
  const errors = {};
  if (!email || !password) {
    errors.login = "Please enter an email and password to continue.";
  }

  if (password.length < 8) {
    errors.password = "Your password must be at least eight characters long.";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
