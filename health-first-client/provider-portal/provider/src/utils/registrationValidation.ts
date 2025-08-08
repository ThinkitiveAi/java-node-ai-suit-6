import { PersonalInfo, ProfessionalInfo, ClinicAddress, AccountSecurity } from '../types/registration';

// Enhanced email validation
export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return 'Email is required';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  if (email.length > 254) {
    return 'Email address is too long';
  }
  
  return null;
};

// Enhanced phone validation
export const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) {
    return 'Phone number is required';
  }
  
  // Remove all non-digits for validation
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length < 10) {
    return 'Phone number must be at least 10 digits';
  }
  
  if (cleanPhone.length > 15) {
    return 'Phone number is too long';
  }
  
  return null;
};

// Name validation
export const validateName = (name: string, fieldName: string): string | null => {
  if (!name.trim()) {
    return `${fieldName} is required`;
  }
  
  if (name.trim().length < 2) {
    return `${fieldName} must be at least 2 characters`;
  }
  
  if (name.trim().length > 50) {
    return `${fieldName} must be less than 50 characters`;
  }
  
  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(name.trim())) {
    return `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`;
  }
  
  return null;
};

// Specialization validation
export const validateSpecialization = (specialization: string): string | null => {
  if (!specialization.trim()) {
    return 'Specialization is required';
  }
  
  if (specialization.trim().length < 3) {
    return 'Specialization must be at least 3 characters';
  }
  
  if (specialization.trim().length > 100) {
    return 'Specialization must be less than 100 characters';
  }
  
  return null;
};

// License number validation
export const validateLicenseNumber = (licenseNumber: string): string | null => {
  if (!licenseNumber.trim()) {
    return 'Medical license number is required';
  }
  
  // Remove spaces and check alphanumeric
  const cleanLicense = licenseNumber.replace(/\s/g, '');
  
  if (cleanLicense.length < 5) {
    return 'License number must be at least 5 characters';
  }
  
  if (cleanLicense.length > 20) {
    return 'License number must be less than 20 characters';
  }
  
  const licenseRegex = /^[A-Za-z0-9]+$/;
  if (!licenseRegex.test(cleanLicense)) {
    return 'License number can only contain letters and numbers';
  }
  
  return null;
};

// Years of experience validation
export const validateYearsOfExperience = (years: number | string): string | null => {
  const yearNum = typeof years === 'string' ? parseInt(years, 10) : years;
  
  if (isNaN(yearNum)) {
    return 'Years of experience is required';
  }
  
  if (yearNum < 0) {
    return 'Years of experience cannot be negative';
  }
  
  if (yearNum > 50) {
    return 'Years of experience cannot exceed 50 years';
  }
  
  return null;
};

// Address validation
export const validateAddress = (address: string, fieldName: string, maxLength: number): string | null => {
  if (!address.trim()) {
    return `${fieldName} is required`;
  }
  
  if (address.trim().length > maxLength) {
    return `${fieldName} must be less than ${maxLength} characters`;
  }
  
  return null;
};

// ZIP/Postal code validation
export const validateZipCode = (zipCode: string): string | null => {
  if (!zipCode.trim()) {
    return 'ZIP/Postal code is required';
  }
  
  // Support US ZIP codes (12345 or 12345-6789) and international postal codes
  const zipRegex = /^[A-Za-z0-9\s-]{3,10}$/;
  if (!zipRegex.test(zipCode.trim())) {
    return 'Please enter a valid ZIP/Postal code';
  }
  
  return null;
};

// Password strength validation
export const validatePasswordStrength = (password: string): string | null => {
  if (!password) {
    return 'Password is required';
  }
  
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  
  if (password.length > 128) {
    return 'Password is too long (max 128 characters)';
  }
  
  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    return 'Password must contain at least one number';
  }
  
  // Check for at least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return 'Password must contain at least one special character';
  }
  
  return null;
};

// Confirm password validation
export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  
  return null;
};

// Get password strength level
export const getPasswordStrength = (password: string): { level: 'weak' | 'medium' | 'strong'; score: number } => {
  let score = 0;
  
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1;
  
  if (score < 3) return { level: 'weak', score };
  if (score < 5) return { level: 'medium', score };
  return { level: 'strong', score };
};

// Validate entire form sections
export const validatePersonalInfo = (data: PersonalInfo): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  const firstNameError = validateName(data.firstName, 'First name');
  if (firstNameError) errors.firstName = firstNameError;
  
  const lastNameError = validateName(data.lastName, 'Last name');
  if (lastNameError) errors.lastName = lastNameError;
  
  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;
  
  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.phone = phoneError;
  
  return errors;
};

export const validateProfessionalInfo = (data: ProfessionalInfo): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  const specializationError = validateSpecialization(data.specialization);
  if (specializationError) errors.specialization = specializationError;
  
  const licenseError = validateLicenseNumber(data.licenseNumber);
  if (licenseError) errors.licenseNumber = licenseError;
  
  const experienceError = validateYearsOfExperience(data.yearsOfExperience);
  if (experienceError) errors.yearsOfExperience = experienceError;
  
  return errors;
};

export const validateClinicAddress = (data: ClinicAddress): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  const streetError = validateAddress(data.streetAddress, 'Street address', 200);
  if (streetError) errors.streetAddress = streetError;
  
  const cityError = validateAddress(data.city, 'City', 100);
  if (cityError) errors.city = cityError;
  
  const stateError = validateAddress(data.state, 'State/Province', 50);
  if (stateError) errors.state = stateError;
  
  const zipError = validateZipCode(data.zipCode);
  if (zipError) errors.zipCode = zipError;
  
  return errors;
};

export const validateAccountSecurity = (data: AccountSecurity): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  const passwordError = validatePasswordStrength(data.password);
  if (passwordError) errors.password = passwordError;
  
  const confirmPasswordError = validateConfirmPassword(data.password, data.confirmPassword);
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
  
  return errors;
}; 