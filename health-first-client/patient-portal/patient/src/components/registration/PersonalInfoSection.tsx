import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Typography,
  FormHelperText,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Lock,
  CalendarToday,
  People,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import { personalInfoFields } from '../../utils/constants';
import { getFieldAccessibilityProps, getHelperTextId } from '../../utils/formHelpers';

interface PersonalInfoSectionProps {
  values: Record<string, string | Date | null>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  handleChange: (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (field: string) => () => void;
  setFieldValue: (field: string, value: string | Date | null) => void;
  setFieldTouched: (field: string, touched?: boolean) => void;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  setFieldTouched,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleDateChange = (field: string) => (date: Dayjs | null) => {
    setFieldValue(field, date ? date.toDate() : null);
    setFieldTouched(field, true);
  };

  const handleSelectChange = (field: string) => (event: any) => {
    setFieldValue(field, event.target.value);
    setFieldTouched(field, true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getFieldIcon = (iconName: string) => {
    switch (iconName) {
      case 'Person':
        return <Person />;
      case 'Email':
        return <Email />;
      case 'Phone':
        return <Phone />;
      case 'Lock':
        return <Lock />;
      case 'CalendarToday':
        return <CalendarToday />;
      case 'People':
        return <People />;
      default:
        return <Person />;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Personal Information
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Name Row */}
          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
            {/* First Name */}
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                label={personalInfoFields.first_name.label}
                              value={(values.first_name as string) || ''}
              onChange={handleChange('first_name')}
              onBlur={handleBlur('first_name')}
              error={touched.first_name && !!errors.first_name}
              helperText={touched.first_name && errors.first_name}
              placeholder={personalInfoFields.first_name.placeholder}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {getFieldIcon(personalInfoFields.first_name.icon)}
                  </InputAdornment>
                ),
              }}
              {...getFieldAccessibilityProps('first_name', personalInfoFields.first_name.label, true)}
              FormHelperTextProps={{
                id: getHelperTextId('first_name'),
              }}
            />
          </Box>

          {/* Last Name */}
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              label={personalInfoFields.last_name.label}
              value={(values.last_name as string) || ''}
              onChange={handleChange('last_name')}
              onBlur={handleBlur('last_name')}
              error={touched.last_name && !!errors.last_name}
              helperText={touched.last_name && errors.last_name}
              placeholder={personalInfoFields.last_name.placeholder}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {getFieldIcon(personalInfoFields.last_name.icon)}
                  </InputAdornment>
                ),
              }}
              {...getFieldAccessibilityProps('last_name', personalInfoFields.last_name.label, true)}
              FormHelperTextProps={{
                id: getHelperTextId('last_name'),
              }}
            />
          </Box>
        </Box>

        {/* Email */}
        <Box>
          <TextField
            fullWidth
            type="email"
            label={personalInfoFields.email.label}
            value={(values.email as string) || ''}
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            error={touched.email && !!errors.email}
            helperText={touched.email && errors.email}
            placeholder={personalInfoFields.email.placeholder}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {getFieldIcon(personalInfoFields.email.icon)}
                </InputAdornment>
              ),
            }}
            {...getFieldAccessibilityProps('email', personalInfoFields.email.label, true)}
            FormHelperTextProps={{
              id: getHelperTextId('email'),
            }}
          />
        </Box>

        {/* Phone Number */}
        <Box>
          <TextField
            fullWidth
            type="tel"
            label={personalInfoFields.phone_number.label}
            value={(values.phone_number as string) || ''}
            onChange={handleChange('phone_number')}
            onBlur={handleBlur('phone_number')}
            error={touched.phone_number && !!errors.phone_number}
            helperText={touched.phone_number && errors.phone_number}
            placeholder={personalInfoFields.phone_number.placeholder}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {getFieldIcon(personalInfoFields.phone_number.icon)}
                </InputAdornment>
              ),
            }}
            {...getFieldAccessibilityProps('phone_number', personalInfoFields.phone_number.label, true)}
            FormHelperTextProps={{
              id: getHelperTextId('phone_number'),
            }}
          />
        </Box>

        {/* Date of Birth and Gender Row */}
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
          {/* Date of Birth */}
          <Box sx={{ flex: 1 }}>
            <DatePicker
              label={personalInfoFields.date_of_birth.label}
              value={values.date_of_birth ? dayjs(values.date_of_birth as Date) : null}
              onChange={handleDateChange('date_of_birth')}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: touched.date_of_birth && !!errors.date_of_birth,
                  helperText: touched.date_of_birth && errors.date_of_birth,
                  placeholder: personalInfoFields.date_of_birth.placeholder,
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        {getFieldIcon(personalInfoFields.date_of_birth.icon)}
                      </InputAdornment>
                    ),
                  },
                  ...getFieldAccessibilityProps('date_of_birth', personalInfoFields.date_of_birth.label, true),
                  FormHelperTextProps: {
                    id: getHelperTextId('date_of_birth'),
                  },
                },
              }}
              maxDate={dayjs()}
            />
          </Box>

          {/* Gender */}
          <Box sx={{ flex: 1 }}>
            <FormControl fullWidth error={touched.gender && !!errors.gender}>
              <InputLabel>{personalInfoFields.gender.label}</InputLabel>
              <Select
                value={(values.gender as string) || ''}
                onChange={handleSelectChange('gender')}
                onBlur={handleBlur('gender')}
                label={personalInfoFields.gender.label}
                startAdornment={
                  <InputAdornment position="start">
                    {getFieldIcon(personalInfoFields.gender.icon)}
                  </InputAdornment>
                }
                {...getFieldAccessibilityProps('gender', personalInfoFields.gender.label, false)}
              >
                {personalInfoFields.gender.options?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {touched.gender && errors.gender && (
                <FormHelperText id={getHelperTextId('gender')}>
                  {errors.gender}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
        </Box>

        {/* Password */}
        <Box>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label={personalInfoFields.password.label}
            value={(values.password as string) || ''}
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            error={touched.password && !!errors.password}
            helperText={touched.password && errors.password}
            placeholder={personalInfoFields.password.placeholder}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {getFieldIcon(personalInfoFields.password.icon)}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...getFieldAccessibilityProps('password', personalInfoFields.password.label, true)}
            FormHelperTextProps={{
              id: getHelperTextId('password'),
            }}
          />
          
          {/* Password Strength Indicator */}
          {values.password && (
            <PasswordStrengthIndicator password={values.password as string} />
          )}
        </Box>

        {/* Confirm Password */}
        <Box>
          <TextField
            fullWidth
            type={showConfirmPassword ? 'text' : 'password'}
            label={personalInfoFields.confirm_password.label}
            value={(values.confirm_password as string) || ''}
            onChange={handleChange('confirm_password')}
            onBlur={handleBlur('confirm_password')}
            error={touched.confirm_password && !!errors.confirm_password}
            helperText={touched.confirm_password && errors.confirm_password}
            placeholder={personalInfoFields.confirm_password.placeholder}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {getFieldIcon(personalInfoFields.confirm_password.icon)}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={toggleConfirmPasswordVisibility}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...getFieldAccessibilityProps('confirm_password', personalInfoFields.confirm_password.label, true)}
            FormHelperTextProps={{
              id: getHelperTextId('confirm_password'),
            }}
          />
        </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default PersonalInfoSection; 