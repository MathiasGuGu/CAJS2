export function validateForm(name, email, password, avatar, banner) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const errors = {};

  if (!emailRegex.test(email)) {
    errors.email = "Please enter a valid email address";
  }
  if (email.length < 1) {
    errors.email = "Please enter an email address";
  }
  if (!password) {
    errors.password = "Please enter a password";
  }
  if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }
  if (!name) {
    errors.name = "Please enter a name";
  }

  return errors;
}
