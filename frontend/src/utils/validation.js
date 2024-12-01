export const validateFile = (file) => {
  const errors = [];
  
  if (!file) {
    errors.push('Please select a file');
    return errors;
  }

  if (file.size > 10 * 1024 * 1024) {
    errors.push('File size must be less than 10MB');
  }

  if (file.type !== 'application/pdf') {
    errors.push('Only PDF files are accepted');
  }

  return errors;
};

export const validateForm = ({ brandFile, region }) => {
  const errors = [];

  if (!brandFile) {
    errors.push('Please upload a brand document');
  }

  if (!region || region.length === 0) {
    errors.push('Please select at least one region');
  }

  return errors;
};