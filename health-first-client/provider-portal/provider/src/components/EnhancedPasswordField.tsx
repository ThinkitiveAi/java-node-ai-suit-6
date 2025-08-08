import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import ErrorMessage from './ErrorMessage';
import { getPasswordStrength } from '../utils/registrationValidation';

interface EnhancedPasswordFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disablePaste?: boolean;
  showStrengthIndicator?: boolean;
  showRequirements?: boolean;
}

const EnhancedPasswordField = forwardRef<HTMLInputElement, EnhancedPasswordFieldProps>(({
  label,
  error,
  helperText,
  required = false,
  disablePaste = false,
  showStrengthIndicator = false,
  showRequirements = false,
  className = '',
  id,
  value = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const fieldId = id || `password-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const hasError = !!error;
  const passwordValue = typeof value === 'string' ? value : '';

  // Password strength analysis
  const strength = getPasswordStrength(passwordValue);
  
  // Password requirements
  const requirements = [
    { text: 'At least 8 characters', met: passwordValue.length >= 8 },
    { text: 'One uppercase letter', met: /[A-Z]/.test(passwordValue) },
    { text: 'One lowercase letter', met: /[a-z]/.test(passwordValue) },
    { text: 'One number', met: /\d/.test(passwordValue) },
    { text: 'One special character', met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(passwordValue) },
  ];

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (disablePaste) {
      e.preventDefault();
    }
  };

  const getStrengthColor = () => {
    switch (strength.level) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
      default: return 'bg-slate-200';
    }
  };

  const getStrengthText = () => {
    if (!passwordValue) return '';
    switch (strength.level) {
      case 'weak': return 'Weak';
      case 'medium': return 'Medium';
      case 'strong': return 'Strong';
      default: return '';
    }
  };

  return (
    <div className="space-y-1">
      <label 
        htmlFor={fieldId}
        className="block text-sm font-medium text-slate-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <input
          ref={ref}
          id={fieldId}
          type={showPassword ? 'text' : 'password'}
          value={value}
          className={`
            input-field pr-12
            ${hasError ? 'input-error' : ''}
            ${className}
          `}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${fieldId}-error` : 
            helperText ? `${fieldId}-helper` : undefined
          }
          onPaste={handlePaste}
          {...props}
        />
        
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-700 focus:outline-none focus:text-slate-700 transition-colors duration-200"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          tabIndex={0}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Password Strength Indicator */}
      {showStrengthIndicator && passwordValue && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Password strength:</span>
            <span className={`text-sm font-medium ${
              strength.level === 'weak' ? 'text-red-600' :
              strength.level === 'medium' ? 'text-yellow-600' :
              'text-green-600'
            }`}>
              {getStrengthText()}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
              style={{ width: `${(strength.score / 6) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Password Requirements */}
      {showRequirements && passwordValue && (
        <div className="space-y-1 mt-3">
          <p className="text-sm font-medium text-slate-700">Password must contain:</p>
          <div className="space-y-1">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-center space-x-2">
                {req.met ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm ${
                  req.met ? 'text-green-700' : 'text-slate-600'
                }`}>
                  {req.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {helperText && !hasError && !showRequirements && (
        <div 
          id={`${fieldId}-helper`}
          className="text-sm text-slate-500"
        >
          {helperText}
        </div>
      )}
      
      {hasError && (
        <ErrorMessage 
          message={error}
          className="mt-1"
        />
      )}
    </div>
  );
});

EnhancedPasswordField.displayName = 'EnhancedPasswordField';

export default EnhancedPasswordField; 