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

  async reply({ category, type }: { category: string; type: string }): Promise<string> {
    return `Thanks! We received your ${category} ${type}.`;
  }
};
