/**
 * Formats a phone number to (Area Code) XXX - XXXX format
 * @param phoneNumber - The phone number to format (can be digits only or already formatted)
 * @returns Formatted phone number string
 */
export function formatPhoneNumber(phoneNumber: string): string {
  if (!phoneNumber) return '';
  
  // Remove all non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  
  // Check if we have a valid US phone number (10 digits)
  if (digitsOnly.length === 10) {
    const areaCode = digitsOnly.slice(0, 3);
    const prefix = digitsOnly.slice(3, 6);
    const lineNumber = digitsOnly.slice(6, 10);
    return `(${areaCode}) ${prefix} - ${lineNumber}`;
  }
  
  // If it's already formatted or doesn't match expected pattern, return as is
  return phoneNumber;
}

/**
 * Formats an array of phone numbers
 * @param phoneNumbers - Array of phone numbers to format
 * @returns Array of formatted phone numbers
 */
export function formatPhoneNumbers(phoneNumbers: string[]): string[] {
  return phoneNumbers.map(formatPhoneNumber);
} 