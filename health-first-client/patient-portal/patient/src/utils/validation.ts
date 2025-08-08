// Email validation regex pattern
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation patterns
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
}

/**
 * Validates email format
 * @param email - Email string to validate
 * @returns ValidationResult with validation status and message
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return {
      isValid: false,
      message: 'Email is required',
    };
  }

  if (!EMAIL_REGEX.test(email)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address',
    };
  }

  return {
    isValid: true,
    message: '',
  };
};

/**
 * Validates password strength
 * @param password - Password string to validate
 * @returns ValidationResult with validation status and message
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return {
      isValid: false,
      message: 'Password is required',
    };
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return {
      isValid: false,
      message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
    };
  }

  if (!PASSWORD_REGEX.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    };
  }

  return {
    isValid: true,
    message: '',
  };
};

/**
 * Validates entire form
 * @param formData - Object containing email and password
 * @returns Object with validation errors
 */
export const validateForm = (formData: { email: string; password: string }): FormErrors => {
  const errors: FormErrors = {};

  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message;
  }

  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
  }

  return errors;
};

/**
 * Checks if form is valid
 * @param formData - Object containing email and password
 * @returns boolean indicating if form is valid
 */
export const isFormValid = (formData: { email: string; password: string }): boolean => {
  const errors = validateForm(formData);
  return Object.keys(errors).length === 0;
};

/**
 * Debounced validation function to prevent excessive re-renders
 * @param value - Value to validate
 * @param validator - Validation function to apply
 * @param delay - Delay in milliseconds
 * @returns Promise with validation result
 */
export const debouncedValidation = (
  value: string,
  validator: (value: string) => ValidationResult,
  delay: number = 300
): Promise<ValidationResult> => {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      resolve(validator(value));
    }, delay);

    return () => clearTimeout(timeoutId);
  });
}; 