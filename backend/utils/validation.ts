/**
 * Checks if the URL parameter is numeric, including cases where the parameter is a number followed by characters.
 * 
 * @param urlId - The URL parameter to be checked.
 * @returns A boolean indicating whether the URL parameter is numeric.
 */
function isUrlParamsNumeric(urlId: string): boolean {
  // Use a regular expression to test if the string consists of only digits.
  return /^[0-9]+[a-zA-Z]*$/.test(urlId);
}

/**
 * Validates the input type of a store-related field.
 * 
 * @param value - The value to be validated.
 * @param expectedType - The expected data type for the value.
 * @param fieldName - The name of the field being validated.
 * @returns A string describing the validation error, or null if the validation passes.
 */
function validateStoreInputType(value: any, expectedType: string, fieldName: string): string | null {
  if (typeof value !== expectedType) {
    return `Invalid input type for ${fieldName}`;
  }
  return null;
}

export {isUrlParamsNumeric, validateStoreInputType}