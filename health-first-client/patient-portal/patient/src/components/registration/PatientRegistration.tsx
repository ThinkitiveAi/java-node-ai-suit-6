import React, { useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Alert,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  CheckCircle,
  LocalHospital,
} from '@mui/icons-material';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import { createValidationSchema, formSteps } from '../../utils/constants';
import { sanitizeFormData, validateFormDataForSubmission } from '../../utils/formHelpers';
import FormProgressIndicator from './FormProgressIndicator';
import PersonalInfoSection from './PersonalInfoSection';
import AddressSection from './AddressSection';
import AdditionalInfoSection from './AdditionalInfoSection';

interface PatientRegistrationProps {
  onRegistrationComplete?: (formData: Record<string, unknown>) => Promise<void>;
  hospitalName?: string;
  logoUrl?: string;
}

const PatientRegistration: React.FC<PatientRegistrationProps> = ({
  onRegistrationComplete,
  hospitalName = 'HealthFirst Medical Center',
  logoUrl,
}) => {
  const theme = useTheme();

  // Initialize form validation
  const validationSchema = createValidationSchema();
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = useFormValidation({
    validationSchema,
    initialValues: {},
  });

  // Initialize multi-step form
  const {
    currentStep,
    completedSteps,
    visitedSteps,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep,
    isLastStep,
    getCurrentStep,
    isStepCompleted,
  } = useMultiStepForm({
    steps: formSteps,
    onStepChange: (stepIndex) => {
      // Mark current step as visited
      console.log(`Navigated to step ${stepIndex + 1}`);
    },
  });

  // Handle form submission
  const handleFormSubmit = useCallback(async (formData: Record<string, unknown>) => {
    try {
      // Sanitize form data
      const sanitizedData = sanitizeFormData(formData);
      
      // Validate form data for submission
      if (!validateFormDataForSubmission(sanitizedData)) {
        throw new Error('Invalid form data detected');
      }

      // Simulate API call
      console.log('Submitting registration data:', sanitizedData);
      
      // In a real application, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onRegistrationComplete) {
        await onRegistrationComplete(sanitizedData);
      }
      
      return Promise.resolve();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }, [onRegistrationComplete]);

  // Handle next step
  const handleNextStep = useCallback(() => {
    const currentStepData = getCurrentStep();
    const currentStepFields = currentStepData.fields;
    
    // Check if current step is valid
    const hasErrors = currentStepFields.some(field => 
      touched[field] && errors[field]
    );
    
    // For Personal Information and Address Information steps, check if all required fields are filled
    const isCurrentStepComplete = currentStepFields.every(field => {
      const value = values[field];
      // Check if field has a value (not empty string, null, or undefined)
      return value !== undefined && value !== null && value !== '';
    });
    
    if (hasErrors || !isCurrentStepComplete) {
      // Mark all fields in current step as touched to show errors
      currentStepFields.forEach(field => {
        setFieldTouched(field, true);
      });
      return;
    }
    
    nextStep();
  }, [getCurrentStep, touched, errors, values, setFieldTouched, nextStep]);

  // Handle previous step
  const handlePrevStep = useCallback(() => {
    prevStep();
  }, [prevStep]);

  // Handle step navigation
  const handleStepClick = useCallback((stepIndex: number) => {
    // Only allow navigation to completed steps or the next step if current is complete
    if (stepIndex <= currentStep || isStepCompleted(stepIndex - 1)) {
      goToStep(stepIndex);
    }
  }, [goToStep, currentStep, isStepCompleted]);

  // Render current step content
  const renderCurrentStep = () => {
    const currentStepData = getCurrentStep();
    
    switch (currentStepData.id) {
      case 'personal':
        return (
          <PersonalInfoSection
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
          />
        );
      case 'address':
        return (
          <AddressSection
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            isSubmitting={isSubmitting}
          />
        );
      case 'additional':
        return (
          <AdditionalInfoSection
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  // Handle final submission
  const handleFinalSubmit = useCallback(async () => {
    try {
      await handleSubmit(handleFormSubmit);
      console.log('Registration completed successfully!');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }, [handleSubmit, handleFormSubmit]);

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
      <Container maxWidth="md">
        <Card
          elevation={8}
          sx={{
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
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              {logoUrl ? (
                <Box
                  component="img"
                  src={logoUrl}
                  alt={`${hospitalName} Logo`}
                  sx={{
                    height: 60,
                    mb: 2,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                  }}
                />
              ) : (
                <LocalHospital
                  sx={{
                    fontSize: 60,
                    color: theme.palette.primary.main,
                    mb: 2,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                  }}
                />
              )}
              
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 600, color: theme.palette.text.primary }}
              >
                {hospitalName}
              </Typography>
              
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Patient Registration
              </Typography>
              
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Create your secure patient account
              </Typography>
            </Box>

            {/* Progress Indicator */}
            <FormProgressIndicator
              steps={formSteps}
              currentStep={currentStep}
              completedSteps={completedSteps}
              visitedSteps={visitedSteps}
              onStepClick={handleStepClick}
            />

            {/* Step Content */}
            <Box sx={{ mb: 4 }}>
              {renderCurrentStep()}
            </Box>

            {/* Navigation Buttons */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={handlePrevStep}
                disabled={isFirstStep || isSubmitting}
                sx={{ minWidth: 120 }}
              >
                Previous
              </Button>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Step {currentStep + 1} of {formSteps.length}
                </Typography>
              </Box>

              {isLastStep ? (
                <Button
                  variant="contained"
                  endIcon={isSubmitting ? <CircularProgress size={20} /> : <CheckCircle />}
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  sx={{ minWidth: 120 }}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={handleNextStep}
                  disabled={isSubmitting}
                  sx={{ minWidth: 120 }}
                >
                  Next
                </Button>
              )}
            </Box>

            {/* Success Message */}
            {isSubmitting && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Creating your account... Please wait.
              </Alert>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default PatientRegistration; 