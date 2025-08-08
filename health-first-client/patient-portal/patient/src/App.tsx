
import { useState } from 'react';
import { ThemeProvider, CssBaseline, Box, Button, Container } from '@mui/material';
import { healthcareTheme } from './styles/theme';
import PatientLogin from './components/PatientLogin';
import PatientRegistration from './components/registration/PatientRegistration';

type ViewMode = 'login' | 'registration';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('login');

  const handleLogin = async (formData: { email: string; password: string }) => {
    // Simulate API call
    console.log('Login attempt:', formData);
    
    // In a real application, this would make an API call to your backend
    // Example:
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // });
    
    // if (!response.ok) {
    //   throw new Error('Login failed');
    // }
    
    // const userData = await response.json();
    // localStorage.setItem('token', userData.token);
    
    return Promise.resolve();
  };

  const handleRegistrationComplete = async (formData: Record<string, unknown>) => {
    console.log('Registration completed:', formData);
    // In a real application, this would handle successful registration
    // For example, redirect to login or show success message
    setViewMode('login');
  };

  const handleForgotPassword = () => {
    console.log('Navigate to forgot password page');
    // In a real application, this would navigate to the forgot password page
  };

  const handleSignUp = () => {
    setViewMode('registration');
  };

  const handleBackToLogin = () => {
    setViewMode('login');
  };

  return (
    <ThemeProvider theme={healthcareTheme}>
      <CssBaseline />
      
      {viewMode === 'login' ? (
        <Box>
          <PatientLogin
            onLogin={handleLogin}
            onForgotPassword={handleForgotPassword}
            onSignUp={handleSignUp}
            hospitalName="HealthFirst Medical Center"
          />
        </Box>
      ) : (
        <Box>
          <PatientRegistration
            onRegistrationComplete={handleRegistrationComplete}
            hospitalName="HealthFirst Medical Center"
          />
          <Container sx={{ textAlign: 'center', mt: 2, mb: 4 }}>
            <Button
              variant="text"
              onClick={handleBackToLogin}
              sx={{ color: 'text.secondary' }}
            >
              ← Back to Login
            </Button>
          </Container>
        </Box>
      )}
    </ThemeProvider>
  );
}

export default App;
