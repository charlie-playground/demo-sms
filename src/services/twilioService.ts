import twilioFactory, { Twilio } from 'twilio';

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_FROM_NUMBER
} = process.env;

let client: Twilio | null = null;

/**
 * Lazily create and cache a Twilio client.
 */
function getClient(): Twilio {
  if (client) return client;

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    throw new Error(
      'Missing Twilio credentials. Please set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN.'
    );
  }

  client = twilioFactory(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  return client;
}

/**
 * Send an SMS message via Twilio.
 */
async function sendMessage(to: string, body: string): Promise<void> {
  if (!TWILIO_FROM_NUMBER) {
    throw new Error(
      'Missing Twilio sender number. Please set TWILIO_FROM_NUMBER.'
    );
  }

  await getClient().messages.create({
    from: TWILIO_FROM_NUMBER,
    to,
    body
  });
}

export const twilio = { sendMessage };
export default twilio;
