import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/animations';

export const LoadingOverlay = () => {
  return (
    <motion.div
      {...fadeIn}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-gray-900/50"
    >
      <div className="relative">
        <div className="w-32 h-32 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 border-t-4 border-b-4 border-purple-500 rounded-full animate-spin"></div>
        </div>
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Creating Your Campaign</h3>
          <p className="text-gray-300">Please wait while we work our magic...</p>
        </div>
      </div>
    </motion.div>
  );
};