/**
 * Thin Twilio wrapper.
 * Only contains a single method needed by the MVP.
 */
export const twilio = {
  async sendMessage({ to, body }: { to: string; body: string }): Promise<void> {
    console.log(`[twilio] -> ${to}\n${body}`);
  }
};
