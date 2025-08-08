import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  FormControl,
  Alert,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Link,
  Divider,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
} from '@mui/icons-material';
import { validateEmail, validatePassword, isFormValid } from '../utils/validation';
import type { FormErrors } from '../utils/validation';
import { prepareSecureFormData, validateFormDataForSubmission, logSecurityEvent } from '../utils/security';

interface LoginFormProps {
  onLogin: (formData: { email: string; password: string }) => Promise<void>;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
}

interface FormData {
  email: string;
  password: string;
}

interface FormState {
  touched: { [key: string]: boolean };
  errors: FormErrors;
  loading: boolean;
  showPassword: boolean;
  rememberMe: boolean;
  alertMessage: string;
  alertSeverity: 'success' | 'error' | 'info' | 'warning';
  showAlert: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  onForgotPassword,
  onSignUp,
}) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [formState, setFormState] = useState<FormState>({
    touched: {},
    errors: {},
    loading: false,
    showPassword: false,
    rememberMe: false,
    alertMessage: '',
    alertSeverity: 'info',
    showAlert: false,
  });

  // Debounced validation effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const errors: FormErrors = {};
      
      if (formState.touched.email) {
        const emailValidation = validateEmail(formData.email);
        if (!emailValidation.isValid) {
          errors.email = emailValidation.message;
        }
      }

      if (formState.touched.password) {
        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.isValid) {
          errors.password = passwordValidation.message;
        }
      }

      setFormState(prev => ({
        ...prev,
        errors,
      }));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [formData.email, formData.password, formState.touched]);

  const handleInputChange = useCallback((field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    setFormState(prev => ({
      ...prev,
      touched: {
        ...prev.touched,
        [field]: true,
      },
    }));
  }, []);

  const handleBlur = useCallback((field: keyof FormData) => () => {
    setFormState(prev => ({
      ...prev,
      touched: {
        ...prev.touched,
        [field]: true,
      },
    }));
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setFormState(prev => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  }, []);

  const handleRememberMeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({
      ...prev,
      rememberMe: event.target.checked,
    }));
  }, []);

  const showAlert = useCallback((message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setFormState(prev => ({
      ...prev,
      alertMessage: message,
      alertSeverity: severity,
      showAlert: true,
    }));
  }, []);

  const hideAlert = useCallback(() => {
    setFormState(prev => ({
      ...prev,
      showAlert: false,
    }));
  }, []);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validate form before submission
    if (!isFormValid(formData)) {
      showAlert('Please fix the errors in the form', 'error');
      return;
    }

    // Security validation
    if (!validateFormDataForSubmission(formData)) {
      logSecurityEvent('suspicious_form_data', { email: formData.email });
      showAlert('Invalid form data detected', 'error');
      return;
    }

    setFormState(prev => ({ ...prev, loading: true, showAlert: false }));

    try {
      // Prepare secure form data
      const secureFormData = prepareSecureFormData(formData);
      
      // Log security event
      logSecurityEvent('login_attempt', { 
        email: secureFormData.email,
        timestamp: secureFormData.timestamp,
      });

      await onLogin(secureFormData);
      
      showAlert('Login successful!', 'success');
    } catch (error) {
      console.error('Login error:', error);
      showAlert('Login failed. Please check your credentials and try again.', 'error');
      
      logSecurityEvent('login_failed', { 
        email: formData.email,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setFormState(prev => ({ ...prev, loading: false }));
    }
  }, [formData, onLogin, showAlert]);

  const isFormValidForSubmission = isFormValid(formData) && !formState.loading;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      {formState.showAlert && (
        <Alert
          severity={formState.alertSeverity}
          onClose={hideAlert}
          sx={{ mb: 2 }}
        >
          {formState.alertMessage}
        </Alert>
      )}

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleInputChange('email')}
          onBlur={handleBlur('email')}
          error={formState.touched.email && !!formState.errors.email}
          helperText={formState.touched.email && formState.errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="action" />
              </InputAdornment>
            ),
          }}
          autoComplete="email"
          disabled={formState.loading}
          sx={{ mb: 1 }}
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Password"
          type={formState.showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleInputChange('password')}
          onBlur={handleBlur('password')}
          error={formState.touched.password && !!formState.errors.password}
          helperText={formState.touched.password && formState.errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePasswordVisibility}
                  edge="end"
                  disabled={formState.loading}
                >
                  {formState.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          autoComplete="current-password"
          disabled={formState.loading}
        />
      </FormControl>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formState.rememberMe}
              onChange={handleRememberMeChange}
              disabled={formState.loading}
              color="primary"
            />
          }
          label="Remember me"
        />
        {onForgotPassword && (
          <Link
            component="button"
            variant="body2"
            onClick={onForgotPassword}
            disabled={formState.loading}
            sx={{ textDecoration: 'none' }}
          >
            Forgot password?
          </Link>
        )}
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={!isFormValidForSubmission}
        sx={{
          py: 1.5,
          mb: 2,
          position: 'relative',
        }}
      >
        {formState.loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Sign In'
        )}
      </Button>

      {onSignUp && (
        <Box sx={{ textAlign: 'center' }}>
          <Divider sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={onSignUp}
              disabled={formState.loading}
              sx={{ textDecoration: 'none' }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default LoginForm; 