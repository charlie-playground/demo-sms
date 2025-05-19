/**
 * Thin Twilio wrapper.
 * Only contains a single method needed by the MVP.
 */
export const twilio = {
  async sendMessage(to: string, body: string): Promise<void> {
    // eslint-disable-next-line no-console
    console.log(`[twilio] -> ${to}\n${body}`);
  }
};
