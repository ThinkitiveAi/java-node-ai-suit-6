import React, { useState, useCallback } from 'react';
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import InputField from './InputField';
import PasswordField from './PasswordField';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { LoginFormData, LoginState, AuthError } from '../types/auth';
import { validateEmailOrPhone, validatePassword } from '../utils/validation';

interface LoginFormProps {
  onLogin?: (data: LoginFormData) => Promise<void>;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onLogin,
  className = '' 
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    emailOrPhone: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loginState, setLoginState] = useState<LoginState>('idle');
  const [authError, setAuthError] = useState<AuthError | null>(null);

  // Real-time validation
  const validateField = useCallback((name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'emailOrPhone':
        error = validateEmailOrPhone(value) || '';
        break;
      case 'password':
        error = validatePassword(value) || '';
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: inputValue
    }));

    // Clear auth error when user starts typing
    if (authError) {
      setAuthError(null);
    }

    // Real-time validation for text inputs
    if (type !== 'checkbox') {
      validateField(name, value);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    const emailPhoneError = validateEmailOrPhone(formData.emailOrPhone);
    const passwordError = validatePassword(formData.password);
    
    if (emailPhoneError) newErrors.emailOrPhone = emailPhoneError;
    if (passwordError) newErrors.password = passwordError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const simulateLogin = async (data: LoginFormData): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate different error scenarios for demo
    if (data.emailOrPhone === 'admin@test.com' && data.password === 'password123') {
      // Success case
      return;
    } else if (data.emailOrPhone === 'locked@test.com') {
      throw new Error('Account is temporarily locked. Please contact support.');
    } else if (data.emailOrPhone === 'network@test.com') {
      throw new Error('Network error. Please check your connection and try again.');
    } else {
      throw new Error('Invalid email/phone or password. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoginState('loading');
    setAuthError(null);

    try {
      if (onLogin) {
        await onLogin(formData);
      } else {
        await simulateLogin(formData);
      }
      
      setLoginState('success');
      
      // Simulate redirect after success
      setTimeout(() => {
        console.log('Redirecting to dashboard...');
        // In a real app, you would navigate to the dashboard here
      }, 1500);
      
    } catch (error) {
      setLoginState('error');
      
      // Determine error type based on message content
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      let errorType: AuthError['type'] = 'authentication';
      
      if (errorMessage.includes('network') || errorMessage.includes('connection')) {
        errorType = 'network';
      } else if (errorMessage.includes('locked') || errorMessage.includes('suspended')) {
        errorType = 'account';
      }
      
      setAuthError({
        type: errorType,
        message: errorMessage
      });
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // In a real app, this would navigate to forgot password page
    alert('Forgot password functionality would be implemented here');
  };

  const isLoading = loginState === 'loading';
  const isSuccess = loginState === 'success';

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Shield className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Provider Portal
        </h1>
        <p className="text-sm text-slate-600">
          Sign in to access your healthcare dashboard
        </p>
      </div>

      {/* Success Message */}
      {isSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-slide-in">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">Login successful!</span>
          </div>
          <p className="text-green-700 text-sm mt-1">Redirecting to your dashboard...</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {authError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-slide-in">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-red-800 font-medium">
                  {authError.type === 'network' ? 'Connection Error' :
                   authError.type === 'account' ? 'Account Issue' :
                   'Authentication Failed'}
                </h3>
                <p className="text-red-700 text-sm mt-1">{authError.message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Email/Phone Field */}
        <InputField
          label="Email or Phone Number"
          name="emailOrPhone"
          type="text"
          value={formData.emailOrPhone}
          onChange={handleInputChange}
          error={errors.emailOrPhone}
          placeholder="Enter your email or phone number"
          disabled={isLoading}
          required
          autoComplete="username"
          helperText="Use your registered email address or phone number"
        />

        {/* Password Field */}
        <PasswordField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          placeholder="Enter your password"
          disabled={isLoading}
          required
          autoComplete="current-password"
          disablePaste={true}
          helperText="Password must be at least 8 characters"
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              disabled={isLoading}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
            />
            <span className="ml-2 text-sm text-slate-700">Remember me</span>
          </label>
          
          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={isLoading}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline disabled:text-slate-400"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className="button-primary flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" />
              Signing in...
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle className="h-5 w-5" />
              Success!
            </>
          ) : (
            'Sign In'
          )}
        </button>

        {/* Demo Credentials */}
        <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800 font-medium mb-2">Demo Credentials:</p>
          <div className="text-xs text-blue-700 space-y-1">
            <div>✅ Success: admin@test.com / password123</div>
            <div>🔒 Account Locked: locked@test.com / any password</div>
            <div>🌐 Network Error: network@test.com / any password</div>
            <div>❌ Invalid: any other credentials</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm; 