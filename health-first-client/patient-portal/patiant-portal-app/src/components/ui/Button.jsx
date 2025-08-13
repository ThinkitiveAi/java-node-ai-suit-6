import React from 'react';
import { motion } from 'framer-motion';

const base = 'inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variantClasses = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500',
  secondary: 'bg-white text-primary-700 border border-primary-200 hover:bg-primary-50 focus-visible:ring-primary-500',
  tertiary: 'bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400',
  outline: 'bg-transparent text-gray-800 border border-gray-300 hover:bg-gray-50 focus-visible:ring-gray-400',
};

const sizeClasses = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
};

export default function Button({
  as = 'button',
  variant = 'primary',
  size = 'md',
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  children,
  className = '',
  ...props
}) {
  const Comp = motion[as] ?? motion.button;
  return (
    <Comp
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {LeadingIcon && (
        <LeadingIcon className="w-4 h-4 mr-2" aria-hidden="true" />
      )}
      <span>{children}</span>
      {TrailingIcon && (
        <TrailingIcon className="w-4 h-4 ml-2" aria-hidden="true" />
      )}
    </Comp>
  );
} 