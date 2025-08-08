// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (supports various formats)
const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

export const validateEmailOrPhone = (value: string): string | null => {
  if (!value.trim()) {
    return 'Email or phone number is required';
  }
  
  // Check if it's an email
  if (value.includes('@')) {
    if (!EMAIL_REGEX.test(value)) {
      return 'Please enter a valid email address';
    }
  } else {
    // Check if it's a phone number
    const cleanPhone = value.replace(/\D/g, '');
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      return 'Please enter a valid phone number';
    }
    if (!PHONE_REGEX.test(cleanPhone)) {
      return 'Please enter a valid phone number';
    }
  }
  
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'Password is required';
  }
  
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  
  return null;
};

export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digits
  const phoneNumber = value.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX for US numbers
  if (phoneNumber.length === 10) {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
  
  // Return original value if not a standard 10-digit US number
  return value;
}; 