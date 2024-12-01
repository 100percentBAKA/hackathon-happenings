import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-32 w-32'
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizes[size]} rounded-full border-4 border-blue-200 border-t-blue-600`}
    />
  );
};