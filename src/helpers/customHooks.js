import { useEffect, useState } from "react";

// Debounce Hook
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

//Password validation
export function usePasswordValidation({ password = "", requiredLength = 8 }) {
  const [validLength, setValidLength] = useState(null);
  const [hasNumber, setHasNumber] = useState(null);
  const [upperCase, setUpperCase] = useState(null);
  const [lowerCase, setLowerCase] = useState(null);
  const [specialChar, setSpecialChar] = useState(null);

  useEffect(() => {
    setValidLength(password.length >= requiredLength ? true : false);
    setUpperCase(password.toUpperCase() !== password);
    setLowerCase(password.toLowerCase() !== password);
    setHasNumber(/\d/.test(password));
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password));
  }, [password, requiredLength]);

  return [validLength, hasNumber, upperCase, lowerCase, specialChar];
}

//Form validation
export function validate(values) {
  let errors = {};
  if (!values.requestedMobile) {
    errors.requestedMobile = "Mobile number is required";
  } else if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(values.requestedMobile)) {
    errors.requestedMobile = "Please enter a valid mobile number";
  }
  if (!values.service) {
    errors.service = "Please enter sevice message";
  } else if (values.service.length < 8) {
    errors.service = "Please enter valid message";
  }
  return errors;
}

// useForm Hook
export function useForm(callback, validate) {
  const [values, setValues] = useState({
    locationId: "KWmND96o17",
    unitId: "",
    requestedMobile: "",
    service: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  function validatePhoneNumber(value) {
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength === 10) return phoneNumber;
    return phoneNumber.slice(0, 10);
  }

  const handleChange = (event) => {
    // event.persist();
    let value = event.target.value;
    let name = event.target.name;
    setValues((values) => ({
      ...values,
      [name]: name === "requestedMobile" ? validatePhoneNumber(value) : value,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    setValues,
    errors,
  };
}
