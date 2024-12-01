import React from 'react';
import { motion } from 'framer-motion';

export const Container = ({ children, className = '', ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};