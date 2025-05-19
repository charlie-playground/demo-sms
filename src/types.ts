export interface Message {
  /**
   * Telephone number that originated the SMS.
   */
  from: string;
  /**
   * Raw incoming SMS body.
   */
  body: string;
  /**
   * Epoch milliseconds timestamp supplied by the gateway.
   */
  timestamp: number;
}

export interface User {
  id: string;
  phone: string;
  /**
   * Allow storage of arbitrary, typed metadata without
   * having to change the interface every time.
   */
  [key: string]: unknown;
}

export interface Doc {
  id: string;
  userId: string;
  category: string;
  type: string;
  content: string;
  createdAt: number;
}
