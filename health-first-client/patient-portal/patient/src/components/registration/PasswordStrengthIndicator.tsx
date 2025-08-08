import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Security,
} from '@mui/icons-material';
import {
  calculatePasswordStrength,
  getPasswordStrengthColor,
  getPasswordStrengthLabel,
  checkPasswordRequirements,
} from '../../utils/formHelpers';

interface PasswordStrengthIndicatorProps {
  password: string;
  showRequirements?: boolean;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
  showRequirements = true,
}) => {
  const strength = calculatePasswordStrength(password);
  const color = getPasswordStrengthColor(strength);
  const label = getPasswordStrengthLabel(strength);
  const requirements = checkPasswordRequirements(password);

  const requirementItems = [
    {
      key: 'minLength',
      label: 'At least 8 characters',
      met: requirements.minLength,
    },
    {
      key: 'hasUppercase',
      label: 'One uppercase letter',
      met: requirements.hasUppercase,
    },
    {
      key: 'hasLowercase',
      label: 'One lowercase letter',
      met: requirements.hasLowercase,
    },
    {
      key: 'hasNumber',
      label: 'One number',
      met: requirements.hasNumber,
    },
    {
      key: 'hasSpecialChar',
      label: 'One special character (@$!%*?&)',
      met: requirements.hasSpecialChar,
    },
  ];

  return (
    <Box sx={{ mt: 1, mb: 2 }}>
      {/* Strength Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Security sx={{ fontSize: 16, color: 'text.secondary' }} />
        <Typography variant="caption" color="text.secondary">
          Password strength:
        </Typography>
        <Chip
          label={label}
          size="small"
          color={color}
          variant="outlined"
          sx={{ fontSize: '0.7rem', height: 20 }}
        />
      </Box>

      {/* Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={strength}
        color={color}
        sx={{
          height: 4,
          borderRadius: 2,
          mb: 1,
          '& .MuiLinearProgress-bar': {
            borderRadius: 2,
          },
        }}
      />

      {/* Requirements List */}
      {showRequirements && (
        <List dense sx={{ py: 0 }}>
          {requirementItems.map((item) => (
            <ListItem key={item.key} sx={{ py: 0.5, px: 0 }}>
              <ListItemIcon sx={{ minWidth: 24 }}>
                {item.met ? (
                  <CheckCircle
                    sx={{
                      fontSize: 16,
                      color: 'success.main',
                    }}
                  />
                ) : (
                  <Cancel
                    sx={{
                      fontSize: 16,
                      color: 'error.main',
                    }}
                  />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="caption"
                    color={item.met ? 'text.secondary' : 'text.primary'}
                    sx={{
                      textDecoration: item.met ? 'line-through' : 'none',
                      opacity: item.met ? 0.7 : 1,
                    }}
                  >
                    {item.label}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Strength Description */}
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 1, display: 'block' }}
      >
        {strength < 25 && 'Your password is very weak. Please add more complexity.'}
        {strength >= 25 && strength < 50 && 'Your password is weak. Consider adding more characters and complexity.'}
        {strength >= 50 && strength < 75 && 'Your password is good. Consider adding special characters for better security.'}
        {strength >= 75 && 'Excellent! Your password is strong and secure.'}
      </Typography>
    </Box>
  );
};

export default PasswordStrengthIndicator; 