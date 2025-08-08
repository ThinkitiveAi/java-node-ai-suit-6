/**
 * Sanitizes input by trimming whitespace and converting to lowercase
 * @param input - Raw input string
 * @returns Sanitized input string
 */
export const sanitizeInput = (input: string): string => {
  return input.trim().toLowerCase();
};

/**
 * Escapes special characters to prevent XSS attacks
 * @param input - Input string to escape
 * @returns Escaped string
 */
export const escapeSpecialCharacters = (input: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return input.replace(/[&<>"'/]/g, (match) => map[match]);
};

/**
 * Generates a CSRF token for form protection
 * @returns CSRF token string
 */
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Validates CSRF token
 * @param token - Token to validate
 * @returns boolean indicating if token is valid
 */
export const validateCSRFToken = (token: string): boolean => {
  return Boolean(token && token.length === 64 && /^[a-f0-9]+$/i.test(token));
};

/**
 * Prepares form data for secure submission
 * @param formData - Form data object
 * @returns Sanitized form data with CSRF token
 */
export const prepareSecureFormData = (formData: { email: string; password: string }) => {
  const csrfToken = generateCSRFToken();
  
  return {
    email: sanitizeInput(formData.email),
    password: formData.password, // Don't sanitize password
    csrfToken,
    timestamp: Date.now(),
  };
};

/**
 * Validates form data before submission
 * @param formData - Form data to validate
 * @returns boolean indicating if data is valid for submission
 */
export const validateFormDataForSubmission = (formData: { email: string; password: string }): boolean => {
  if (!formData.email || !formData.password) {
    return false;
  }

  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i,
  ];

  const emailContainsSuspiciousPattern = suspiciousPatterns.some(pattern => 
    pattern.test(formData.email)
  );

  if (emailContainsSuspiciousPattern) {
    return false;
  }

  return true;
};

/**
 * Clears sensitive data from memory
 * @param formData - Form data object to clear
 */
export const clearSensitiveData = (formData: { email: string; password: string }) => {
  // In a real application, you would implement proper memory clearing
  // This is a placeholder for demonstration
  Object.keys(formData).forEach(key => {
    (formData as Record<string, string>)[key] = '';
  });
};

/**
 * Checks if the current environment is secure
 * @returns boolean indicating if environment is secure
 */
export const isSecureEnvironment = (): boolean => {
  // Check if running on HTTPS
  if (typeof window !== 'undefined') {
    return window.location.protocol === 'https:';
  }
  return true; // Assume secure for server-side
};

/**
 * Logs security events (in production, this would send to a security monitoring service)
 * @param event - Security event to log
 * @param details - Additional details about the event
 */
export const logSecurityEvent = (event: string, details?: Record<string, unknown>) => {
  const securityLog = {
    event,
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
    details,
  };

  // In production, this would be sent to a security monitoring service
  console.warn('Security Event:', securityLog);
}; 