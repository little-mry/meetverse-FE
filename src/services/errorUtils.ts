function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export const getErrorMessage = (
  error: unknown,
  defaultMessage: string = 'Ett okänt fel inträffade',
): string => {
  if (isError(error)) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return defaultMessage;
};
