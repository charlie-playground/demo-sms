/**
 * Discrete values the AI model may choose from.
 * Keeping them in their own module makes re-use and
 * change-management straightforward.
 */
export const categories = [
  'application',
  'support',
  'feedback'
] as const;

export const types = [
  'pdf',
  'image',
  'text'
] as const;
