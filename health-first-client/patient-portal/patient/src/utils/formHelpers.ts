

// Password strength calculation
export const calculatePasswordStrength = (password: string): number => {
  let score = 0;
  
  if (password.length >= 8) score += 25;
  if (/[a-z]/.test(password)) score += 25;
  if (/[A-Z]/.test(password)) score += 25;
  if (/\d/.test(password)) score += 12.5;
  if (/[@$!%*?&]/.test(password)) score += 12.5;
  
  return Math.min(score, 100);
};

// Password strength color
export const getPasswordStrengthColor = (strength: number): 'error' | 'warning' | 'info' | 'success' => {
  if (strength < 25) return 'error';
  if (strength < 50) return 'warning';
  if (strength < 75) return 'info';
  return 'success';
};

// Password strength label
export const getPasswordStrengthLabel = (strength: number): string => {
  if (strength < 25) return 'Weak';
  if (strength < 50) return 'Fair';
  if (strength < 75) return 'Good';
  return 'Strong';
};

// Password requirements check
export const checkPasswordRequirements = (password: string) => {
  return {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[@$!%*?&]/.test(password)
  };
};

// Format phone number for display
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

// Format ZIP code for display
export const formatZipCode = (zip: string): string => {
  const cleaned = zip.replace(/\D/g, '');
  if (cleaned.length === 5) {
    return cleaned;
  } else if (cleaned.length === 9) {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
  }
  return zip;
};

// Debounce function for validation
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Sanitize form data
export const sanitizeFormData = (data: Record<string, any>): Record<string, any> => {
  const sanitized: Record<string, any> = {};
  
  Object.keys(data).forEach(key => {
    const value = data[key];
    
    if (typeof value === 'string') {
      // Don't sanitize passwords
      if (key.includes('password')) {
        sanitized[key] = value;
      } else {
        sanitized[key] = value.trim().replace(/[<>\"'&]/g, (match: string) => {
          const escapeMap: Record<string, string> = {
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '&': '&amp;'
          };
          return escapeMap[match];
        });
      }
    } else {
      sanitized[key] = value;
    }
  });
  
  return sanitized;
};

// Validate form data for submission
export const validateFormDataForSubmission = (data: Record<string, any>): boolean => {
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i,
  ];

  for (const [, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      const containsSuspiciousPattern = suspiciousPatterns.some(pattern => 
        pattern.test(value)
      );
      
      if (containsSuspiciousPattern) {
        return false;
      }
    }
  }

  return true;
};

// Generate form field ID
export const generateFieldId = (fieldName: string): string => {
  return `field-${fieldName.replace(/[^a-zA-Z0-9]/g, '-')}`;
};

// Get field accessibility props
export const getFieldAccessibilityProps = (fieldName: string, label: string, required: boolean = false) => {
  return {
    id: generateFieldId(fieldName),
    'aria-label': label,
    'aria-required': required,
    'aria-describedby': `${generateFieldId(fieldName)}-helper-text`,
  };
};

// Get helper text ID
export const getHelperTextId = (fieldName: string): string => {
  return `${generateFieldId(fieldName)}-helper-text`;
};

// Check if field is valid
export const isFieldValid = (_value: any, touched: boolean, error: string): boolean => {
  if (!touched) return true;
  return !error;
};

// Get field error state
export const getFieldErrorState = (_value: any, touched: boolean, error: string): boolean => {
  return touched && !!error;
};

// Format date for display
export const formatDateForDisplay = (date: Date | null): string => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

// Parse date from string
export const parseDateFromString = (dateString: string): Date | null => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

// Get step completion percentage
export const getStepCompletionPercentage = (
  currentStep: number,
  totalSteps: number,
  completedSteps: Set<number>
): number => {
  const completedCount = completedSteps.size;
  const currentStepWeight = currentStep < totalSteps ? 1 : 0;
  const totalWeight = totalSteps + currentStepWeight;
  
  return Math.round(((completedCount + currentStepWeight) / totalWeight) * 100);
};

// Check if step is accessible
export const isStepAccessible = (
  stepIndex: number,
  currentStep: number,
  completedSteps: Set<number>
): boolean => {
  return stepIndex <= currentStep || completedSteps.has(stepIndex);
};

// Get field validation message
export const getFieldValidationMessage = (
  fieldName: string,
  value: any,
  touched: boolean,
  error: string,
  required: boolean = false
): string => {
  if (!touched) return '';
  if (error) return error;
  if (required && !value) return `${fieldName} is required`;
  return '';
}; 