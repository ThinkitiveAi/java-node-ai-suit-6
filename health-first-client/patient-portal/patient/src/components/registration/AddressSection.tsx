import React from 'react';
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputAdornment,
} from '@mui/material';
import {
  Home,
  LocationCity,
  Place,
  MarkunreadMailbox,
} from '@mui/icons-material';


interface AddressSectionProps {
  values: Record<string, string | Date | null>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  handleChange: (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (field: string) => () => void;
  isSubmitting: boolean;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  isSubmitting,
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Address Information
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Please provide your residential address for medical correspondence and emergency contact purposes.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Street Address */}
        <FormControl fullWidth>
          <TextField
            id="street"
            name="street"
            label="Street Address"
            value={values.street as string}
            onChange={handleChange('street')}
            onBlur={handleBlur('street')}
            error={touched.street && !!errors.street}
            helperText={touched.street && errors.street}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Home color="action" />
                </InputAdornment>
              ),
            }}
            placeholder="123 Main Street, Apt 4B"
            disabled={isSubmitting}
            autoComplete="street-address"
          />
        </FormControl>

        {/* City */}
        <FormControl fullWidth>
          <TextField
            id="city"
            name="city"
            label="City"
            value={values.city as string}
            onChange={handleChange('city')}
            onBlur={handleBlur('city')}
            error={touched.city && !!errors.city}
            helperText={touched.city && errors.city}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationCity color="action" />
                </InputAdornment>
              ),
            }}
            placeholder="New York"
            disabled={isSubmitting}
            autoComplete="address-level2"
          />
        </FormControl>

        {/* State */}
        <FormControl fullWidth>
          <TextField
            id="state"
            name="state"
            label="State"
            value={values.state as string}
            onChange={handleChange('state')}
            onBlur={handleBlur('state')}
            error={touched.state && !!errors.state}
            helperText={touched.state && errors.state}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Place color="action" />
                </InputAdornment>
              ),
            }}
            placeholder="NY"
            disabled={isSubmitting}
            autoComplete="address-level1"
          />
        </FormControl>

        {/* ZIP Code */}
        <FormControl fullWidth>
          <TextField
            id="zip"
            name="zip"
            label="ZIP Code"
            value={values.zip as string}
            onChange={handleChange('zip')}
            onBlur={handleBlur('zip')}
            error={touched.zip && !!errors.zip}
            helperText={touched.zip && errors.zip}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MarkunreadMailbox color="action" />
                </InputAdornment>
              ),
            }}
            placeholder="12345 or 12345-6789"
            disabled={isSubmitting}
            autoComplete="postal-code"
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default AddressSection; 