import React from 'react';
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputAdornment,
  Chip,
  Autocomplete,
  Divider,
} from '@mui/material';
import {
  ContactEmergency,
  Phone,
  FamilyRestroom,
  HealthAndSafety,
  Assignment,
  MedicalServices,
} from '@mui/icons-material';

interface AdditionalInfoSectionProps {
  values: Record<string, string | Date | null | string[]>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  handleChange: (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (field: string) => () => void;
  isSubmitting: boolean;
}

const AdditionalInfoSection: React.FC<AdditionalInfoSectionProps> = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  isSubmitting,
}) => {
  const medicalConditions = [
    'Diabetes',
    'Hypertension',
    'Heart Disease',
    'Asthma',
    'Allergies',
    'Cancer',
    'Mental Health',
    'Thyroid Disorder',
    'Arthritis',
    'Other',
  ];

  const handleMedicalConditionsChange = (_event: React.SyntheticEvent, newValue: string[]) => {
    // Create a synthetic event for the medical_conditions field
    const syntheticEvent = {
      target: {
        name: 'medical_conditions',
        value: newValue,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    
    handleChange('medical_conditions')(syntheticEvent);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Additional Information
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        The following information is optional but helps us provide better care.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Emergency Contact Section */}
        <Box>
          <Typography variant="h6" component="h3" gutterBottom sx={{ color: 'primary.main' }}>
            Emergency Contact
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Please provide an emergency contact person (optional).
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Emergency Contact Name */}
            <FormControl fullWidth>
              <TextField
                id="emergency_name"
                name="emergency_name"
                label="Emergency Contact Name"
                value={values.emergency_name as string}
                onChange={handleChange('emergency_name')}
                onBlur={handleBlur('emergency_name')}
                error={touched.emergency_name && !!errors.emergency_name}
                helperText={touched.emergency_name && errors.emergency_name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactEmergency color="action" />
                    </InputAdornment>
                  ),
                }}
                placeholder="John Doe"
                disabled={isSubmitting}
                autoComplete="name"
              />
            </FormControl>

            {/* Emergency Contact Phone */}
            <FormControl fullWidth>
              <TextField
                id="emergency_phone"
                name="emergency_phone"
                label="Emergency Contact Phone"
                value={values.emergency_phone as string}
                onChange={handleChange('emergency_phone')}
                onBlur={handleBlur('emergency_phone')}
                error={touched.emergency_phone && !!errors.emergency_phone}
                helperText={touched.emergency_phone && errors.emergency_phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="action" />
                    </InputAdornment>
                  ),
                }}
                placeholder="+1 (555) 123-4567"
                disabled={isSubmitting}
                autoComplete="tel"
              />
            </FormControl>

            {/* Emergency Contact Relationship */}
            <FormControl fullWidth>
              <TextField
                id="emergency_relationship"
                name="emergency_relationship"
                label="Relationship"
                value={values.emergency_relationship as string}
                onChange={handleChange('emergency_relationship')}
                onBlur={handleBlur('emergency_relationship')}
                error={touched.emergency_relationship && !!errors.emergency_relationship}
                helperText={touched.emergency_relationship && errors.emergency_relationship}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FamilyRestroom color="action" />
                    </InputAdornment>
                  ),
                }}
                placeholder="Spouse, Parent, Friend"
                disabled={isSubmitting}
              />
            </FormControl>
          </Box>
        </Box>

        <Divider />

        {/* Insurance Section */}
        <Box>
          <Typography variant="h6" component="h3" gutterBottom sx={{ color: 'primary.main' }}>
            Insurance Information
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Please provide your insurance information (optional).
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Insurance Provider */}
            <FormControl fullWidth>
              <TextField
                id="insurance_provider"
                name="insurance_provider"
                label="Insurance Provider"
                value={values.insurance_provider as string}
                onChange={handleChange('insurance_provider')}
                onBlur={handleBlur('insurance_provider')}
                error={touched.insurance_provider && !!errors.insurance_provider}
                helperText={touched.insurance_provider && errors.insurance_provider}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HealthAndSafety color="action" />
                    </InputAdornment>
                  ),
                }}
                placeholder="Blue Cross Blue Shield"
                disabled={isSubmitting}
              />
            </FormControl>

            {/* Policy Number */}
            <FormControl fullWidth>
              <TextField
                id="policy_number"
                name="policy_number"
                label="Policy Number"
                value={values.policy_number as string}
                onChange={handleChange('policy_number')}
                onBlur={handleBlur('policy_number')}
                error={touched.policy_number && !!errors.policy_number}
                helperText={touched.policy_number && errors.policy_number}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Assignment color="action" />
                    </InputAdornment>
                  ),
                }}
                placeholder="123456789"
                disabled={isSubmitting}
              />
            </FormControl>
          </Box>
        </Box>

        <Divider />

        {/* Medical History Section */}
        <Box>
          <Typography variant="h6" component="h3" gutterBottom sx={{ color: 'primary.main' }}>
            Medical History
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Please select any medical conditions that apply to you (optional).
          </Typography>

          <FormControl fullWidth>
            <Autocomplete
              multiple
              id="medical_conditions"
              options={medicalConditions}
              value={(values.medical_conditions as string[]) || []}
              onChange={handleMedicalConditionsChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Medical Conditions"
                  placeholder="Select conditions..."
                  error={touched.medical_conditions && !!errors.medical_conditions}
                  helperText={touched.medical_conditions && errors.medical_conditions}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <MedicalServices color="action" />
                      </InputAdornment>
                    ),
                  }}
                  disabled={isSubmitting}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                    key={option}
                  />
                ))
              }
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option}
                </Box>
              )}
            />
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default AdditionalInfoSection; 