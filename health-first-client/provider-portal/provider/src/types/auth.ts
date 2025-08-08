export interface LoginFormData {
  emailOrPhone: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginFormErrors {
  emailOrPhone?: string;
  password?: string;
  general?: string;
}

export type LoginState = 'idle' | 'loading' | 'success' | 'error';

export interface AuthError {
  type: 'validation' | 'authentication' | 'network' | 'account';
  message: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  redirectUrl?: string;
} 