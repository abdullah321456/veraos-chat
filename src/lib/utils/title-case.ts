/**
 * Converts text to title case where the first letter of every word is capitalized
 * and the rest is lowercase.
 * 
 * @param text - The text to convert to title case
 * @returns The text in title case format
 */
export function toTitleCase(text: string): string {
  if (!text) return '';
  
  // Trim whitespace and handle empty strings
  const trimmedText = text.trim();
  if (!trimmedText) return '';
  
  return trimmedText
    .toLowerCase()
    .split(' ')
    .map(word => {
      // Skip empty words
      if (!word) return word;
      
      // Handle special cases like "&", "-", "/", etc.
      if (word.includes('&')) {
        return word.split('&').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('&');
      }
      if (word.includes('-')) {
        return word.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('-');
      }
      if (word.includes('/')) {
        return word.split('/').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('/');
      }
      if (word.includes('(') && word.includes(')')) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      
      // Regular word capitalization - ensure first letter is uppercase
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

/**
 * Enhanced title case function that handles various input formats
 * @param text - The text to convert to title case
 * @returns The text in proper title case format
 */
export function toEnhancedTitleCase(text: string): string {
  if (!text) return '';
  
  // Trim whitespace
  const trimmedText = text.trim();
  if (!trimmedText) return '';
  
  // If it's a single word, just capitalize the first letter
  if (!trimmedText.includes(' ')) {
    return trimmedText.charAt(0).toUpperCase() + trimmedText.slice(1).toLowerCase();
  }
  
  // For multiple words, use the regular title case function
  return toTitleCase(trimmedText);
}

/**
 * List of words that should remain lowercase in title case (except when they're the first word)
 */
const LOWER_CASE_WORDS = [
  'a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'
];

/**
 * Converts text to title case with proper handling of articles and prepositions
 * @param text - The text to convert to title case
 * @returns The text in proper title case format
 */
export function toProperTitleCase(text: string): string {
  if (!text) return '';
  
  const words = text.toLowerCase().split(' ');
  
  return words
    .map((word, index) => {
      // Always capitalize the first and last word
      if (index === 0 || index === words.length - 1) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      
      // Keep certain words lowercase unless they're the first or last word
      if (LOWER_CASE_WORDS.includes(word)) {
        return word;
      }
      
      // Capitalize all other words
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

/**
 * React hook to automatically apply title case to text content
 */
export function useTitleCase(text: string): string {
  return toTitleCase(text);
}

/**
 * React hook to automatically apply enhanced title case to text content
 */
export function useEnhancedTitleCase(text: string): string {
  return toEnhancedTitleCase(text);
}

/**
 * React hook to automatically apply proper title case to text content
 */
export function useProperTitleCase(text: string): string {
  return toProperTitleCase(text);
} 