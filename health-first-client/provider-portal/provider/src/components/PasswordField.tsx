import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import ErrorMessage from './ErrorMessage';

interface PasswordFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disablePaste?: boolean;
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(({
  label,
  error,
  helperText,
  required = false,
  disablePaste = false,
  className = '',
  id,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const fieldId = id || `password-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const hasError = !!error;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (disablePaste) {
      e.preventDefault();
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
      
      {helperText && !hasError && (
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

PasswordField.displayName = 'PasswordField';

export default PasswordField; 