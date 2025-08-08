import * as Yup from 'yup';

// Form field definitions
export const personalInfoFields = {
  first_name: {
    type: 'text',
    required: true,
    validation: Yup.string()
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name cannot exceed 50 characters')
      .matches(/^[a-zA-Z\s'-]+$/, 'Only letters, spaces, hyphens, and apostrophes allowed')
      .required('First name is required'),
    icon: 'Person',
    label: 'First Name',
    placeholder: 'Enter your first name'
  },
  last_name: {
    type: 'text',
    required: true,
    validation: Yup.string()
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name cannot exceed 50 characters')
      .matches(/^[a-zA-Z\s'-]+$/, 'Only letters, spaces, hyphens, and apostrophes allowed')
      .required('Last name is required'),
    icon: 'Person',
    label: 'Last Name',
    placeholder: 'Enter your last name'
  },
  email: {
    type: 'email',
    required: true,
    validation: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    icon: 'Email',
    label: 'Email Address',
    placeholder: 'Enter your email address'
  },
  phone_number: {
    type: 'tel',
    required: true,
    validation: Yup.string()
      .matches(/^\+?[\d\s\-\(\)]{10,15}$/, 'Please enter a valid phone number')
      .required('Phone number is required'),
    icon: 'Phone',
    label: 'Phone Number',
    placeholder: '+1 (555) 123-4567'
  },
  date_of_birth: {
    type: 'date',
    required: true,
    validation: Yup.date()
      .max(new Date(), 'Date of birth cannot be in the future')
      .test('age', 'Must be at least 13 years old', function(birthDate) {
        if (!birthDate) return false;
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          return age - 1 >= 13;
        }
        return age >= 13;
      })
      .required('Date of birth is required'),
    icon: 'CalendarToday',
    label: 'Date of Birth',
    placeholder: 'MM/DD/YYYY'
  },
  gender: {
    type: 'select',
    required: false,
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' },
      { value: 'prefer_not_to_say', label: 'Prefer not to say' }
    ],
    validation: Yup.string(),
    icon: 'People',
    label: 'Gender',
    placeholder: 'Select gender (optional)'
  },
  password: {
    type: 'password',
    required: true,
    validation: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
        'Password must contain uppercase, lowercase, number, and special character')
      .required('Password is required'),
    icon: 'Lock',
    label: 'Password',
    placeholder: 'Create a strong password',
    showStrengthIndicator: true
  },
  confirm_password: {
    type: 'password',
    required: true,
    validation: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
    icon: 'Lock',
    label: 'Confirm Password',
    placeholder: 'Confirm your password'
  }
};

export const addressFields = {
  street: {
    type: 'text',
    required: true,
    validation: Yup.string()
      .max(200, 'Street address cannot exceed 200 characters')
      .required('Street address is required'),
    icon: 'Home',
    label: 'Street Address',
    placeholder: 'Enter your street address'
  },
  city: {
    type: 'text',
    required: true,
    validation: Yup.string()
      .max(100, 'City cannot exceed 100 characters')
      .required('City is required'),
    icon: 'LocationCity',
    label: 'City',
    placeholder: 'Enter your city'
  },
  state: {
    type: 'text',
    required: true,
    validation: Yup.string()
      .max(50, 'State cannot exceed 50 characters')
      .required('State is required'),
    icon: 'Place',
    label: 'State',
    placeholder: 'Enter your state'
  },
  zip: {
    type: 'text',
    required: true,
    validation: Yup.string()
      .matches(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code (12345 or 12345-6789)')
      .required('ZIP code is required'),
    icon: 'MarkunreadMailbox',
    label: 'ZIP Code',
    placeholder: '12345 or 12345-6789'
  }
};

export const emergencyContactFields = {
  emergency_name: {
    type: 'text',
    required: false,
    validation: Yup.string().max(100, 'Name cannot exceed 100 characters'),
    icon: 'ContactEmergency',
    label: 'Emergency Contact Name',
    placeholder: 'Enter emergency contact name (optional)'
  },
  emergency_phone: {
    type: 'tel',
    required: false,
    validation: Yup.string()
      .matches(/^\+?[\d\s\-\(\)]{10,15}$/, 'Please enter a valid phone number'),
    icon: 'Phone',
    label: 'Emergency Contact Phone',
    placeholder: '+1 (555) 123-4567 (optional)'
  },
  emergency_relationship: {
    type: 'text',
    required: false,
    validation: Yup.string().max(50, 'Relationship cannot exceed 50 characters'),
    icon: 'FamilyRestroom',
    label: 'Relationship',
    placeholder: 'e.g., Spouse, Parent, Friend (optional)'
  }
};

export const insuranceFields = {
  insurance_provider: {
    type: 'text',
    required: false,
    validation: Yup.string().max(100, 'Provider name cannot exceed 100 characters'),
    icon: 'HealthAndSafety',
    label: 'Insurance Provider',
    placeholder: 'Enter insurance provider name (optional)'
  },
  policy_number: {
    type: 'text',
    required: false,
    validation: Yup.string().max(50, 'Policy number cannot exceed 50 characters'),
    icon: 'Assignment',
    label: 'Policy Number',
    placeholder: 'Enter policy number (optional)'
  }
};

export const medicalHistoryOptions = [
  'Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Allergies',
  'Cancer', 'Mental Health', 'Thyroid Disorder', 'Arthritis', 'Other'
];

export const medicalHistoryFields = {
  medical_conditions: {
    type: 'multiselect',
    required: false,
    options: medicalHistoryOptions,
    validation: Yup.array().of(Yup.string()),
    icon: 'MedicalServices',
    label: 'Medical Conditions',
    placeholder: 'Select medical conditions (optional)'
  }
};

// Form steps configuration
export const formSteps = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Basic details and login credentials (Required)',
    icon: 'Person',
    fields: ['first_name', 'last_name', 'email', 'phone_number', 'date_of_birth', 'gender', 'password', 'confirm_password']
  },
  {
    id: 'address',
    title: 'Address Information',
    description: 'Your residential address (Required)',
    icon: 'Home',
    fields: ['street', 'city', 'state', 'zip']
  },
  {
    id: 'additional',
    title: 'Additional Information',
    description: 'Emergency contact, insurance, and medical history (Optional)',
    icon: 'MoreHoriz',
    fields: ['emergency_name', 'emergency_phone', 'emergency_relationship', 'insurance_provider', 'policy_number', 'medical_conditions']
  }
];

// Password strength requirements
export const passwordRequirements = {
  minLength: 8,
  hasUppercase: true,
  hasLowercase: true,
  hasNumber: true,
  hasSpecialChar: true
};

// Form validation schema
export const createValidationSchema = () => {
  const allFields = {
    ...personalInfoFields,
    ...addressFields,
    ...emergencyContactFields,
    ...insuranceFields,
    ...medicalHistoryFields
  };

  const schemaObject: Record<string, any> = {};
  
  Object.keys(allFields).forEach(fieldName => {
    const field = allFields[fieldName as keyof typeof allFields];
    if (field.validation) {
      schemaObject[fieldName] = field.validation;
    }
  });

  return Yup.object().shape(schemaObject);
};

// Security constants
export const SECURITY_CONSTANTS = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_LOGIN_ATTEMPTS: 5,
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  CSRF_TOKEN_LENGTH: 64,
  DEBOUNCE_DELAY: 300
};

// Accessibility constants
export const ACCESSIBILITY_CONSTANTS = {
  FOCUS_VISIBLE_OUTLINE: '2px solid #1976d2',
  FOCUS_VISIBLE_OFFSET: '2px',
  HIGH_CONTRAST_THRESHOLD: 4.5,
  REDUCED_MOTION_PREFERENCE: 'prefers-reduced-motion'
}; 