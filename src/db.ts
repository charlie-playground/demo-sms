/**
 * Very light-weight DB abstraction used by the pipeline.
 * In production this would connect to a real database.
 */
import { Doc, Message, User } from './types.js';

export const db = {
  /**
   * Fake user lookup based on phone number.
   * Replace with actual query / ORM call when integrating
   * with a real persistence layer.
   */
  async getUser(phone: string): Promise<User> {
    return {
      id: 'user_' + phone.replace(/\D/g, ''),
      phone
    };
  },

  /**
   * Persist an arbitrary document.
   */
  async saveDoc(doc: Doc): Promise<void> {
    // eslint-disable-next-line no-console
    console.log('[db] saveDoc', doc);
  },

  /**
   * Store the raw inbound message for auditing.
   */
  async logMessage(message: Message): Promise<void> {
    // eslint-disable-next-line no-console
    console.log('[db] logMessage', message);
  }
};
