import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import ErrorMessage from './ErrorMessage';

interface SelectDropdownProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label: string;
  options: readonly string[] | string[];
  error?: string;
  helperText?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const SelectDropdown = forwardRef<HTMLSelectElement, SelectDropdownProps>(({
  label,
  options,
  error,
  helperText,
  required = false,
  placeholder = 'Select an option',
  className = '',
  id,
  onChange,
  ...props
}, ref) => {
  const fieldId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const hasError = !!error;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
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
        <select
          ref={ref}
          id={fieldId}
          className={`
            input-field pr-10 appearance-none cursor-pointer
            ${hasError ? 'input-error' : ''}
            ${className}
          `}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${fieldId}-error` : 
            helperText ? `${fieldId}-helper` : undefined
          }
          onChange={handleChange}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="h-5 w-5 text-slate-400" />
        </div>
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

SelectDropdown.displayName = 'SelectDropdown';

export default SelectDropdown; 