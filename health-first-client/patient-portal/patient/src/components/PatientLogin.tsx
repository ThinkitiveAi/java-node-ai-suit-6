import React, { useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  Paper,
} from '@mui/material';
import { LocalHospital, HealthAndSafety } from '@mui/icons-material';
import LoginForm from './LoginForm';
import SecurityBadge from './SecurityBadge';

interface PatientLoginProps {
  onLogin: (formData: { email: string; password: string }) => Promise<void>;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  hospitalName?: string;
  logoUrl?: string;
}

const PatientLogin: React.FC<PatientLoginProps> = ({
  onLogin,
  onForgotPassword,
  onSignUp,
  hospitalName = 'HealthFirst Medical Center',
  logoUrl,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogin = useCallback(async (formData: { email: string; password: string }) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real application, this would make an API call
    console.log('Login attempt with:', formData);
    
    // Simulate successful login
    return Promise.resolve();
  }, []);

  const handleForgotPassword = useCallback(() => {
    console.log('Forgot password clicked');
    // In a real application, this would navigate to forgot password page
  }, []);

  const handleSignUp = useCallback(() => {
    console.log('Sign up clicked');
    // In a real application, this would navigate to sign up page
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.primary.light}15 0%, ${theme.palette.secondary.light}15 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Left side - Hospital branding and info */}
          {!isMobile && (
            <Box sx={{ flex: { md: 1 }, maxWidth: { md: '50%' } }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  background: 'transparent',
                }}
              >
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  {logoUrl ? (
                    <Box
                      component="img"
                      src={logoUrl}
                      alt={`${hospitalName} Logo`}
                      sx={{
                        height: 80,
                        mb: 2,
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                      }}
                    />
                  ) : (
                    <LocalHospital
                      sx={{
                        fontSize: 80,
                        color: theme.palette.primary.main,
                        mb: 2,
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                      }}
                    />
                  )}
                  
                  <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      mb: 1,
                    }}
                  >
                    {hospitalName}
                  </Typography>
                  
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mb: 3, fontWeight: 400 }}
                  >
                    Patient Portal
                  </Typography>
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                  <HealthAndSafety
                    sx={{
                      fontSize: 48,
                      color: theme.palette.secondary.main,
                      mb: 2,
                    }}
                  />
                  
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 500, mb: 2 }}
                  >
                    Secure Access to Your Health Records
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3, lineHeight: 1.6 }}
                  >
                    Access your medical records, schedule appointments, and communicate 
                    with your healthcare team through our secure patient portal.
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <SecurityBadge variant="success" />
                  </Box>
                                 </Box>
               </Paper>
             </Box>
           )}

           {/* Right side - Login form */}
           <Box sx={{ flex: { md: 1 }, maxWidth: { md: '50%' } }}>
            <Card
              elevation={8}
              sx={{
                maxWidth: 480,
                mx: 'auto',
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                {/* Mobile header */}
                {isMobile && (
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <LocalHospital
                      sx={{
                        fontSize: 48,
                        color: theme.palette.primary.main,
                        mb: 1,
                      }}
                    />
                    <Typography
                      variant="h5"
                      component="h1"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {hospitalName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Patient Portal Login
                    </Typography>
                  </Box>
                )}

                <Typography
                  variant="h4"
                  component="h2"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    textAlign: isMobile ? 'center' : 'left',
                    mb: 1,
                  }}
                >
                  Welcome Back
                </Typography>
                
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    mb: 4,
                    textAlign: isMobile ? 'center' : 'left',
                  }}
                >
                  Sign in to access your patient portal
                </Typography>

                <LoginForm
                  onLogin={onLogin || handleLogin}
                  onForgotPassword={onForgotPassword || handleForgotPassword}
                  onSignUp={onSignUp || handleSignUp}
                />

                {/* Security badge for mobile */}
                {isMobile && (
                  <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <SecurityBadge variant="default" />
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Help links */}
            <Box
              sx={{
                mt: 3,
                textAlign: 'center',
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Need help? Contact support at{' '}
                <Typography
                  component="span"
                  variant="body2"
                  color="primary"
                  sx={{ fontWeight: 500 }}
                >
                  support@healthfirst.com
                </Typography>
              </Typography>
              
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Available 24/7 for urgent medical inquiries
              </Typography>
                         </Box>
           </Box>
         </Box>
       </Container>
     </Box>
   );
 };

export default PatientLogin; 