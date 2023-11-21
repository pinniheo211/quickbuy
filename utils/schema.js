import * as Yup from "yup";
const validateRef = (value) => {
  if (value === null || value === undefined || value === "") {
    return true;
  }
  return value.length >= 3 && value.length <= 100;
};

export const SCHEMA_REGISTER_DASHBOARD = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(3, "First name must be at least 3 characters")
    .max(100, "First name cannot exceed 100 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(3, "Last name must be at least 3 characters")
    .max(100, "Last name cannot exceed 100 characters"),
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(100, "Username cannot exceed 100 characters"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .max(250, "Email cannot exceed 250 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  ref: Yup.string().test({
    name: "ref-validation",
    test: validateRef,
    message:
      "Refferal must be at least 3 characters and cannot exceed 100 characters",
  }),
});

export const SCHEMA_REGISTER = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(100, "Username cannot exceed 100 characters"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .max(250, "Email cannot exceed 250 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const SCHEMA_LOGIN = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .max(250, "Email cannot exceed 250 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const SCHEMA_FORGOT = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .max(250, "Email cannot exceed 250 characters"),
});

export const SCHEMA_RESET_PASS = Yup.object().shape({
  code: Yup.string()
    .required("Otp is required")
    .min(3, "Otp must be at least 3 characters")
    .max(100, "Otp cannot exceed 100 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
