import React from 'react';
import { motion } from 'framer-motion';

export const PageHeader = ({ title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      {description && (
        <p className="mt-2 text-lg text-gray-600">{description}</p>
      )}
    </motion.div>
  );
};