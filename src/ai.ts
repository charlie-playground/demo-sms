/**
 * Stub implementation for AI tasks.
 * Swap out the internals with OpenAI / Claude / etc.
 */
export const ai = {
  async categorize(
    text: string,
    allowed: readonly string[]
  ): Promise<string> {
    // Naïve heuristic placeholder.
    const guess = allowed.find((c) =>
      text.toLowerCase().includes(c)
    );
    return guess ?? allowed[0];
  },

  async extractType(
    text: string,
    allowed: readonly string[]
  ): Promise<string> {
    const guess = allowed.find((t) =>
      text.toLowerCase().includes(t)
    );
    return guess ?? allowed[0];
  },

  /**
   * Build a human-friendly reply message.
   * The real implementation would use an LLM prompt.
   */
  async reply(category: string, type: string): Promise<string> {
    return `Thanks! We received your ${category} ${type}.`;
  }
};
