import React from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  LinearProgress,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  CheckCircle,
  RadioButtonUnchecked,
  Person,
  Home,
  MoreHoriz,
} from '@mui/icons-material';

interface FormStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  fields: string[];
}

interface FormProgressIndicatorProps {
  steps: FormStep[];
  currentStep: number;
  completedSteps: Set<number>;
  visitedSteps: Set<number>;
  onStepClick?: (stepIndex: number) => void;
  showProgressBar?: boolean;
  showStepContent?: boolean;
}

const FormProgressIndicator: React.FC<FormProgressIndicatorProps> = ({
  steps,
  currentStep,
  completedSteps,
  visitedSteps,
  onStepClick,
  showProgressBar = true,
  showStepContent = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Get step icon
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Person':
        return <Person />;
      case 'Home':
        return <Home />;
      case 'MoreHoriz':
        return <MoreHoriz />;
      default:
        return <RadioButtonUnchecked />;
    }
  };

  // Calculate completion percentage
  const completionPercentage = Math.round(
    ((completedSteps.size + (currentStep < steps.length ? 1 : 0)) / steps.length) * 100
  );

  // Check if step is accessible
  const isStepAccessible = (stepIndex: number): boolean => {
    return stepIndex <= currentStep || visitedSteps.has(stepIndex);
  };

  // Get step status
  const getStepStatus = (stepIndex: number) => {
    if (completedSteps.has(stepIndex)) {
      return 'completed';
    }
    if (stepIndex === currentStep) {
      return 'active';
    }
    if (visitedSteps.has(stepIndex)) {
      return 'visited';
    }
    return 'inactive';
  };

  // Get step color
  const getStepColor = (stepIndex: number) => {
    const status = getStepStatus(stepIndex);
    switch (status) {
      case 'completed':
        return 'success';
      case 'active':
        return 'primary';
      case 'visited':
        return 'info';
      default:
        return 'default';
    }
  };

  // Handle step click
  const handleStepClick = (stepIndex: number) => {
    if (isStepAccessible(stepIndex) && onStepClick) {
      onStepClick(stepIndex);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      {/* Progress Bar */}
      {showProgressBar && (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Registration Progress
            </Typography>
            <Chip
              label={`${completionPercentage}% Complete`}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>
          <LinearProgress
            variant="determinate"
            value={completionPercentage}
            sx={{
              height: 6,
              borderRadius: 3,
              '& .MuiLinearProgress-bar': {
                borderRadius: 3,
              },
            }}
          />
        </Box>
      )}

      {/* Stepper */}
      <Stepper
        activeStep={currentStep}
        orientation={isMobile ? 'vertical' : 'horizontal'}
        sx={{
          '& .MuiStepConnector-root': {
            '& .MuiStepConnector-line': {
              minHeight: isMobile ? 24 : 'auto',
            },
          },
        }}
      >
                 {steps.map((step, index) => {
           const isCompleted = completedSteps.has(index);
           const isActive = index === currentStep;
           const isAccessible = isStepAccessible(index);

          return (
            <Step key={step.id} completed={isCompleted}>
              <StepLabel
                onClick={() => handleStepClick(index)}
                sx={{
                  cursor: isAccessible ? 'pointer' : 'default',
                  '&:hover': {
                    opacity: isAccessible ? 0.8 : 1,
                  },
                  '& .MuiStepLabel-iconContainer': {
                    color: getStepColor(index),
                  },
                  '& .MuiStepLabel-label': {
                    color: isActive ? 'primary.main' : 'text.secondary',
                    fontWeight: isActive ? 600 : 400,
                  },
                }}
                icon={
                  isCompleted ? (
                    <CheckCircle color="success" />
                  ) : (
                    getStepIcon(step.icon)
                  )
                }
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? 'primary.main' : 'text.primary',
                      }}
                    >
                      {step.title}
                    </Typography>
                    {/* Show required indicator for Personal and Address steps */}
                    {(index === 0 || index === 1) && (
                      <Chip
                        label="Required"
                        size="small"
                        color="error"
                        variant="outlined"
                        sx={{ 
                          fontSize: '0.6rem', 
                          height: 16,
                          '& .MuiChip-label': {
                            px: 0.5,
                          }
                        }}
                      />
                    )}
                  </Box>
                  {isMobile && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: '0.7rem' }}
                    >
                      {step.description}
                    </Typography>
                  )}
                </Box>
              </StepLabel>

              {/* Step Content (for mobile) */}
              {isMobile && showStepContent && isActive && (
                <StepContent>
                  <Box sx={{ mt: 1, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {step.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      {step.fields.length} field{step.fields.length !== 1 ? 's' : ''} to complete
                    </Typography>
                  </Box>
                </StepContent>
              )}
            </Step>
          );
        })}
      </Stepper>

      {/* Step Status Summary */}
      {!isMobile && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Step {currentStep + 1} of {steps.length}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {steps.map((_, index) => (
              <Chip
                key={index}
                label={index + 1}
                size="small"
                color={getStepColor(index)}
                variant={getStepStatus(index) === 'active' ? 'filled' : 'outlined'}
                sx={{ fontSize: '0.7rem', height: 20 }}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FormProgressIndicator; 