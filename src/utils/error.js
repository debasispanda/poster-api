const formatError = (error, message) => {
  if (error) {
    if (typeof error === 'string') {
      return error;
    } else if(error.error && typeof error.error === 'string') {
      return error.error;
    } else if (error.detail && typeof error.detail === 'string') {
      return error.detail;
    }
  }

  return { message };
}

module.exports = formatError;
