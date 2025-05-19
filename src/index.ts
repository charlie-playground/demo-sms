/**
 * Public entry-point used by the webhook handler (or tests).
 * It wires the individual step functions together and
 * returns the created document for downstream consumers.
 */
import { steps } from './steps.js';
import { Message, Doc } from './types.js';

export async function onReceivedMessage(
  message: Message
): Promise<Doc | undefined> {
  let ctx = { incoming: message };

  ctx = await steps.loadUser(ctx);
  ctx = await steps.logIncoming(ctx);
  ctx = await steps.categorize(ctx);
  ctx = await steps.extractType(ctx);
  ctx = await steps.persistDoc(ctx);
  ctx = await steps.buildReply(ctx);
  ctx = await steps.dispatchReply(ctx);

  return ctx.doc;
}
