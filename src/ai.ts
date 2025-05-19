/**
 * Stub implementation for AI tasks.
 * Swap out the internals with OpenAI / Claude / etc.
 */
export const ai = {
  async categorize({ text, allowed }: { text: string; allowed: readonly string[] }): Promise<string> {
    const guess = allowed.find(c => text.toLowerCase().includes(c));
    return guess ?? allowed[0];
  },

  async extractType({ text, allowed }: { text: string; allowed: readonly string[] }): Promise<string> {
    const guess = allowed.find(t => text.toLowerCase().includes(t));
    return guess ?? allowed[0];
  },

  /**
   * Create a user-friendly acknowledgment message.
   *
   * @param options - Object containing the detected category and type.
   * @param options.category - The high-level category (e.g. "order").
   * @param options.type - The specific type within the category (e.g. "status").
   * @returns A short reply string that can be sent back to the user.
   */
  async reply({ category, type }: { category: string; type: string }): Promise<string> {
    return `Thanks! We received your ${category} ${type}.`;
  }
};
