export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ProfessionalInfo {
  specialization: string;
  licenseNumber: string;
  yearsOfExperience: number;
}

export interface ClinicAddress {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface AccountSecurity {
  password: string;
  confirmPassword: string;
}

export interface RegistrationFormData {
  personalInfo: PersonalInfo;
  professionalInfo: ProfessionalInfo;
  clinicAddress: ClinicAddress;
  accountSecurity: AccountSecurity;
}

export interface RegistrationErrors {
  personalInfo?: Record<string, string>;
  professionalInfo?: Record<string, string>;
  clinicAddress?: Record<string, string>;
  accountSecurity?: Record<string, string>;
  general?: string;
}

export type RegistrationState = 'idle' | 'submitting' | 'success' | 'error';

export interface RegistrationError {
  type: 'validation' | 'duplicate' | 'network' | 'server';
  message: string;
  field?: string;
}

export interface RegistrationResponse {
  success: boolean;
  message?: string;
  errors?: RegistrationError[];
  redirectUrl?: string;
}

// Medical specializations list
export const MEDICAL_SPECIALIZATIONS = [
  'Family Medicine',
  'Internal Medicine',
  'Pediatrics',
  'Cardiology',
  'Dermatology',
  'Emergency Medicine',
  'Endocrinology',
  'Gastroenterology',
  'General Surgery',
  'Neurology',
  'Obstetrics and Gynecology',
  'Oncology',
  'Ophthalmology',
  'Orthopedic Surgery',
  'Otolaryngology',
  'Pathology',
  'Psychiatry',
  'Pulmonology',
  'Radiology',
  'Rheumatology',
  'Urology',
  'Other',
] as const;

export type MedicalSpecialization = typeof MEDICAL_SPECIALIZATIONS[number]; 