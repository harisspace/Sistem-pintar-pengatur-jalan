import validator from "validator";
import { SignupErrors, SigninErrors } from "../Interface/authInterface";

export function signupValidator(username: string, email: string, password: string) {
  let errors: Partial<SignupErrors> = {};
  // validate
  validator.isEmpty(username) ? (errors.username = "Username must not empty") : null;
  validator.isEmpty(email) ? (errors.email = "Email must not empty") : null;
  validator.isEmpty(password) ? (errors.password = "Password must not empty") : null;

  // validate email when not empty
  if (!errors.username) {
    validator.isEmail(email) ? null : (errors.email = "Email not valid");
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1 ? true : false,
  };
}

export function signinValidator(email: string, password: string) {
  let errors: Partial<SigninErrors> = {};
  // validate
  validator.isEmpty(email) ? (errors.email = "Email must not empty") : null;
  validator.isEmpty(password) ? (errors.password = "Password must not empty") : null;

  // validate email when not empty
  if (!errors.password) {
    validator.isEmail(email) ? null : (errors.email = "Email not valid");
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1 ? true : false,
  };
}
