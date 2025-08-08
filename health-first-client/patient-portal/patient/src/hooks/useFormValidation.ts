import { useState, useCallback } from 'react';
import * as Yup from 'yup';
import { debounce } from '../utils/formHelpers';

interface UseFormValidationProps {
  validationSchema: Yup.ObjectSchema<any>;
  initialValues?: Record<string, any>;
}

interface FormState {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

export const useFormValidation = ({ validationSchema, initialValues = {} }: UseFormValidationProps) => {
  const [state, setState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: false,
  });

  // Debounced validation function
  const debouncedValidate = useCallback(
    debounce(async (values: Record<string, any>) => {
      try {
        await validationSchema.validate(values, { abortEarly: false });
        setState(prev => ({
          ...prev,
          errors: {},
          isValid: true,
        }));
      } catch (validationError: any) {
        if (validationError instanceof Yup.ValidationError) {
          const errors: Record<string, string> = {};
          validationError.inner.forEach((error: any) => {
            if (error.path) {
              errors[error.path] = error.message;
            }
          });
          setState(prev => ({
            ...prev,
            errors,
            isValid: false,
          }));
        }
      }
    }, 300),
    [validationSchema]
  );

  // Validate a single field
  const validateField = useCallback(async (name: string, value: any) => {
    try {
      await validationSchema.validateAt(name, { [name]: value });
      setState(prev => ({
        ...prev,
        errors: { ...prev.errors, [name]: '' },
      }));
      return true;
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        setState(prev => ({
          ...prev,
          errors: { ...prev.errors, [name]: error.message },
        }));
      }
      return false;
    }
  }, [validationSchema]);

  // Handle field change
  const handleChange = useCallback((name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newValues = { ...state.values, [name]: value };
    
    setState(prev => ({
      ...prev,
      values: newValues,
    }));

    // Validate field if it has been touched
    if (state.touched[name]) {
      validateField(name, value);
    }

    // Debounced validation of entire form
    debouncedValidate(newValues);
  }, [state.values, state.touched, validateField, debouncedValidate]);

  // Handle field blur
  const handleBlur = useCallback((name: string) => () => {
    setState(prev => ({
      ...prev,
      touched: { ...prev.touched, [name]: true },
    }));
    
    validateField(name, state.values[name]);
  }, [state.values, validateField]);

  // Handle form submission
  const handleSubmit = useCallback(async (onSubmit: (values: Record<string, any>) => Promise<void>) => {
    setState(prev => ({ ...prev, isSubmitting: true }));

    try {
      // Validate entire form
      await validationSchema.validate(state.values, { abortEarly: false });
      
      // Submit form
      await onSubmit(state.values);
      
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        isValid: true,
      }));
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        const errors: Record<string, string> = {};
        error.inner.forEach((err: any) => {
          if (err.path) {
            errors[err.path] = err.message;
          }
        });
        
        setState(prev => ({
          ...prev,
          errors,
          isSubmitting: false,
          isValid: false,
        }));
      } else {
        setState(prev => ({
          ...prev,
          isSubmitting: false,
        }));
      }
      throw error;
    }
  }, [state.values, validationSchema]);

  // Reset form
  const resetForm = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
      isValid: false,
    });
  }, [initialValues]);

  // Set field value
  const setFieldValue = useCallback((name: string, value: any) => {
    const newValues = { ...state.values, [name]: value };
    setState(prev => ({
      ...prev,
      values: newValues,
    }));

    if (state.touched[name]) {
      validateField(name, value);
    }

    debouncedValidate(newValues);
  }, [state.values, state.touched, validateField, debouncedValidate]);

  // Set field touched
  const setFieldTouched = useCallback((name: string, touched: boolean = true) => {
    setState(prev => ({
      ...prev,
      touched: { ...prev.touched, [name]: touched },
    }));
  }, []);

  // Check if field has error
  const hasError = useCallback((name: string): boolean => {
    return !!(state.touched[name] && state.errors[name]);
  }, [state.touched, state.errors]);

  // Get field error
  const getFieldError = useCallback((name: string): string => {
    return state.touched[name] ? state.errors[name] || '' : '';
  }, [state.touched, state.errors]);

  // Check if form is valid for current step
  const isStepValid = useCallback((stepFields: string[]): boolean => {
    const stepValues: Record<string, any> = {};
    stepFields.forEach(field => {
      if (state.values[field] !== undefined) {
        stepValues[field] = state.values[field];
      }
    });

    try {
      validationSchema.validateSync(stepValues, { abortEarly: false });
      return true;
    } catch {
      return false;
    }
  }, [state.values, validationSchema]);

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    isValid: state.isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldTouched,
    hasError,
    getFieldError,
    isStepValid,
    validateField,
  };
}; 