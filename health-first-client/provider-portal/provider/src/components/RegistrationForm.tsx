import React, { useState, useCallback } from 'react';
import { User, Briefcase, MapPin, Lock, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import SectionCard from './SectionCard';
import InputField from './InputField';
import SelectDropdown from './SelectDropdown';
import EnhancedPasswordField from './EnhancedPasswordField';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import {
  RegistrationFormData,
  RegistrationErrors,
  RegistrationState,
  RegistrationError,
  MEDICAL_SPECIALIZATIONS
} from '../types/registration';
import {
  validatePersonalInfo,
  validateProfessionalInfo,
  validateClinicAddress,
  validateAccountSecurity
} from '../utils/registrationValidation';

interface RegistrationFormProps {
  onRegister?: (data: RegistrationFormData) => Promise<void>;
  className?: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ 
  onRegister,
  className = '' 
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    professionalInfo: {
      specialization: '',
      licenseNumber: '',
      yearsOfExperience: 0,
    },
    clinicAddress: {
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
    },
    accountSecurity: {
      password: '',
      confirmPassword: '',
    },
  });

  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [registrationState, setRegistrationState] = useState<RegistrationState>('idle');
  const [registrationError, setRegistrationError] = useState<RegistrationError | null>(null);

  // Real-time validation for sections
  const validateSection = useCallback((sectionName: keyof RegistrationFormData, data: any) => {
    let sectionErrors = {};
    
    switch (sectionName) {
      case 'personalInfo':
        sectionErrors = validatePersonalInfo(data);
        break;
      case 'professionalInfo':
        sectionErrors = validateProfessionalInfo(data);
        break;
      case 'clinicAddress':
        sectionErrors = validateClinicAddress(data);
        break;
      case 'accountSecurity':
        sectionErrors = validateAccountSecurity(data);
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [sectionName]: sectionErrors
    }));
  }, []);

  const handleInputChange = (section: keyof RegistrationFormData, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));

    // Clear registration error when user starts typing
    if (registrationError) {
      setRegistrationError(null);
    }

    // Real-time validation for the section
    const updatedSectionData = {
      ...formData[section],
      [field]: value
    };
    validateSection(section, updatedSectionData);
  };

  const validateAllSections = (): boolean => {
    const personalErrors = validatePersonalInfo(formData.personalInfo);
    const professionalErrors = validateProfessionalInfo(formData.professionalInfo);
    const addressErrors = validateClinicAddress(formData.clinicAddress);
    const securityErrors = validateAccountSecurity(formData.accountSecurity);

    const allErrors: RegistrationErrors = {
      personalInfo: personalErrors,
      professionalInfo: professionalErrors,
      clinicAddress: addressErrors,
      accountSecurity: securityErrors,
    };

    setErrors(allErrors);

    return (
      Object.keys(personalErrors).length === 0 &&
      Object.keys(professionalErrors).length === 0 &&
      Object.keys(addressErrors).length === 0 &&
      Object.keys(securityErrors).length === 0
    );
  };

  const simulateRegistration = async (data: RegistrationFormData): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Simulate different error scenarios for demo
    if (data.personalInfo.email === 'taken@example.com') {
      throw { type: 'duplicate', message: 'Email address is already registered', field: 'email' };
    }
    
    if (data.professionalInfo.licenseNumber === 'DUPLICATE123') {
      throw { type: 'duplicate', message: 'License number is already registered', field: 'licenseNumber' };
    }
    
    if (data.personalInfo.firstName === 'NetworkError') {
      throw { type: 'network', message: 'Network connection failed. Please check your connection and try again.' };
    }
    
    // Success case
    return;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAllSections()) {
      return;
    }

    setRegistrationState('submitting');
    setRegistrationError(null);

    try {
      if (onRegister) {
        await onRegister(formData);
      } else {
        await simulateRegistration(formData);
      }
      
      setRegistrationState('success');
      
      // Simulate redirect after success
      setTimeout(() => {
        console.log('Redirecting to dashboard or login...');
        // In a real app, you would navigate to the appropriate page
      }, 2000);
      
    } catch (error: any) {
      setRegistrationState('error');
      
      const errorMessage = error.message || 'Registration failed. Please try again.';
      const errorType = error.type || 'server';
      
      setRegistrationError({
        type: errorType,
        message: errorMessage,
        field: error.field
      });
    }
  };

  const handleRetry = () => {
    setRegistrationState('idle');
    setRegistrationError(null);
  };

  const isSubmitting = registrationState === 'submitting';
  const isSuccess = registrationState === 'success';
  const hasError = registrationState === 'error';

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <User className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Provider Registration
        </h1>
        <p className="text-slate-600">
          Join our healthcare network and start providing exceptional care
        </p>
      </div>

      {/* Success Message */}
      {isSuccess && (
        <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg animate-slide-in">
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
            <div>
              <h3 className="text-green-800 font-medium">Registration Successful!</h3>
              <p className="text-green-700 text-sm mt-1">
                Your account has been created successfully. You will be redirected shortly.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Global Error Message */}
      {hasError && registrationError && (
        <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg animate-slide-in">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
              <div>
                <h3 className="text-red-800 font-medium">
                  {registrationError.type === 'network' ? 'Connection Error' :
                   registrationError.type === 'duplicate' ? 'Duplicate Entry' :
                   'Registration Failed'}
                </h3>
                <p className="text-red-700 text-sm mt-1">{registrationError.message}</p>
              </div>
            </div>
            {registrationError.type === 'network' && (
              <button
                onClick={handleRetry}
                className="ml-4 text-red-600 hover:text-red-800 font-medium text-sm flex items-center"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Retry
              </button>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Section */}
        <SectionCard
          title="Personal Information"
          description="Basic information about yourself"
          icon={<User className="h-5 w-5 text-blue-600" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="First Name"
              name="firstName"
              value={formData.personalInfo.firstName}
              onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
              error={errors.personalInfo?.firstName}
              placeholder="Enter your first name"
              disabled={isSubmitting}
              required
              autoComplete="given-name"
            />
            
            <InputField
              label="Last Name"
              name="lastName"
              value={formData.personalInfo.lastName}
              onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
              error={errors.personalInfo?.lastName}
              placeholder="Enter your last name"
              disabled={isSubmitting}
              required
              autoComplete="family-name"
            />
            
            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={formData.personalInfo.email}
              onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
              error={errors.personalInfo?.email}
              placeholder="Enter your email address"
              disabled={isSubmitting}
              required
              autoComplete="email"
              helperText="We'll use this for account verification and communications"
            />
            
            <InputField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.personalInfo.phone}
              onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
              error={errors.personalInfo?.phone}
              placeholder="Enter your phone number"
              disabled={isSubmitting}
              required
              autoComplete="tel"
              helperText="Include area code for better verification"
            />
          </div>
        </SectionCard>

        {/* Professional Information Section */}
        <SectionCard
          title="Professional Information"
          description="Details about your medical practice"
          icon={<Briefcase className="h-5 w-5 text-blue-600" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectDropdown
              label="Specialization"
              options={MEDICAL_SPECIALIZATIONS}
              value={formData.professionalInfo.specialization}
              onChange={(value) => handleInputChange('professionalInfo', 'specialization', value)}
              error={errors.professionalInfo?.specialization}
              placeholder="Select your medical specialization"
              disabled={isSubmitting}
              required
              helperText="Choose the specialization that best describes your practice"
            />
            
            <InputField
              label="Medical License Number"
              name="licenseNumber"
              value={formData.professionalInfo.licenseNumber}
              onChange={(e) => handleInputChange('professionalInfo', 'licenseNumber', e.target.value)}
              error={errors.professionalInfo?.licenseNumber}
              placeholder="Enter your license number"
              disabled={isSubmitting}
              required
              helperText="This will be verified during the approval process"
            />
            
                         <InputField
               label="Years of Experience"
               name="yearsOfExperience"
               type="number"
               min="0"
               max="50"
               value={formData.professionalInfo.yearsOfExperience.toString()}
               onChange={(e) => handleInputChange('professionalInfo', 'yearsOfExperience', parseInt(e.target.value) || 0)}
               error={errors.professionalInfo?.yearsOfExperience}
               placeholder="0"
               disabled={isSubmitting}
               required
               helperText="Total years of medical practice experience"
             />
          </div>
        </SectionCard>

        {/* Clinic Address Section */}
        <SectionCard
          title="Clinic Address"
          description="Primary practice location"
          icon={<MapPin className="h-5 w-5 text-blue-600" />}
        >
          <div className="grid grid-cols-1 gap-6">
            <InputField
              label="Street Address"
              name="streetAddress"
              value={formData.clinicAddress.streetAddress}
              onChange={(e) => handleInputChange('clinicAddress', 'streetAddress', e.target.value)}
              error={errors.clinicAddress?.streetAddress}
              placeholder="Enter street address"
              disabled={isSubmitting}
              required
              autoComplete="street-address"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField
                label="City"
                name="city"
                value={formData.clinicAddress.city}
                onChange={(e) => handleInputChange('clinicAddress', 'city', e.target.value)}
                error={errors.clinicAddress?.city}
                placeholder="Enter city"
                disabled={isSubmitting}
                required
                autoComplete="address-level2"
              />
              
              <InputField
                label="State/Province"
                name="state"
                value={formData.clinicAddress.state}
                onChange={(e) => handleInputChange('clinicAddress', 'state', e.target.value)}
                error={errors.clinicAddress?.state}
                placeholder="Enter state or province"
                disabled={isSubmitting}
                required
                autoComplete="address-level1"
              />
              
              <InputField
                label="ZIP/Postal Code"
                name="zipCode"
                value={formData.clinicAddress.zipCode}
                onChange={(e) => handleInputChange('clinicAddress', 'zipCode', e.target.value)}
                error={errors.clinicAddress?.zipCode}
                placeholder="Enter ZIP or postal code"
                disabled={isSubmitting}
                required
                autoComplete="postal-code"
              />
            </div>
          </div>
        </SectionCard>

        {/* Account Security Section */}
        <SectionCard
          title="Account Security"
          description="Create a secure password for your account"
          icon={<Lock className="h-5 w-5 text-blue-600" />}
        >
          <div className="grid grid-cols-1 gap-6 max-w-md">
            <EnhancedPasswordField
              label="Password"
              name="password"
              value={formData.accountSecurity.password}
              onChange={(e) => handleInputChange('accountSecurity', 'password', e.target.value)}
              error={errors.accountSecurity?.password}
              placeholder="Create a strong password"
              disabled={isSubmitting}
              required
              autoComplete="new-password"
              showStrengthIndicator={true}
              showRequirements={true}
              disablePaste={true}
            />
            
            <EnhancedPasswordField
              label="Confirm Password"
              name="confirmPassword"
              value={formData.accountSecurity.confirmPassword}
              onChange={(e) => handleInputChange('accountSecurity', 'confirmPassword', e.target.value)}
              error={errors.accountSecurity?.confirmPassword}
              placeholder="Confirm your password"
              disabled={isSubmitting}
              required
              autoComplete="new-password"
              disablePaste={true}
            />
          </div>
        </SectionCard>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className="button-primary max-w-md flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" />
                Creating Account...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="h-5 w-5" />
                Account Created!
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </div>

        {/* Demo Information */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800 font-medium mb-2">Demo Test Cases:</p>
          <div className="text-xs text-blue-700 space-y-1">
            <div>📧 Email "taken@example.com" - Duplicate email error</div>
            <div>🏥 License "DUPLICATE123" - Duplicate license error</div>
            <div>🌐 First name "NetworkError" - Network connection error</div>
            <div>✅ Any other valid data - Successful registration</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm; 