import React, { forwardRef } from 'react';
import ErrorMessage from './ErrorMessage';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
  label,
  error,
  helperText,
  required = false,
  className = '',
  id,
  ...props
}, ref) => {
  const fieldId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const hasError = !!error;

  return (
    <div className="space-y-1">
      <label 
        htmlFor={fieldId}
        className="block text-sm font-medium text-slate-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <input
        ref={ref}
        id={fieldId}
        className={`
          input-field
          ${hasError ? 'input-error' : ''}
          ${className}
        `}
        aria-invalid={hasError}
        aria-describedby={
          hasError ? `${fieldId}-error` : 
          helperText ? `${fieldId}-helper` : undefined
        }
        {...props}
      />
      
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

InputField.displayName = 'InputField';

export default InputField; 