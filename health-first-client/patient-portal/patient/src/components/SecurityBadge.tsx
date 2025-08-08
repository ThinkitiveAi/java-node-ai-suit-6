import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { Security, Lock, VerifiedUser } from '@mui/icons-material';

interface SecurityBadgeProps {
  variant?: 'default' | 'success' | 'warning';
  showIcon?: boolean;
}

const SecurityBadge: React.FC<SecurityBadgeProps> = ({ 
  variant = 'default', 
  showIcon = true 
}) => {
  const getSecurityInfo = () => {
    switch (variant) {
      case 'success':
        return {
          icon: <VerifiedUser fontSize="small" />,
          label: 'Secure Connection',
          color: 'success' as const,
        };
      case 'warning':
        return {
          icon: <Lock fontSize="small" />,
          label: 'Standard Security',
          color: 'warning' as const,
        };
      default:
        return {
          icon: <Security fontSize="small" />,
          label: 'HIPAA Compliant',
          color: 'primary' as const,
        };
    }
  };

  const securityInfo = getSecurityInfo();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        justifyContent: 'center',
        py: 1,
      }}
    >
      {showIcon && (
        <Chip
          icon={securityInfo.icon}
          label={securityInfo.label}
          color={securityInfo.color}
          size="small"
          variant="outlined"
          sx={{
            fontSize: '0.75rem',
            height: 24,
            '& .MuiChip-icon': {
              fontSize: '1rem',
            },
          }}
        />
      )}
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ fontSize: '0.7rem' }}
      >
        Your information is protected with bank-level encryption
      </Typography>
    </Box>
  );
};

export default SecurityBadge; 