/**
 * Individual pipeline steps separated for clarity, testability,
 * and potential parallelisation in the future.
 */
import { db } from './db.js';
import { ai } from './ai.js';
import { twilio } from './twilio.js';
import { categories, types } from './constants.js';
import { Doc, Message, User } from './types.js';

export interface Context {
  incoming: Message;
  user?: User;
  category?: string;
  docType?: string;
  doc?: Doc;
  reply?: string;
}

async function loadUser(ctx: Context): Promise<Context> {
  ctx.user = await db.getUser(ctx.incoming.from);
  return ctx;
}

async function logIncoming(ctx: Context): Promise<Context> {
  await db.logMessage(ctx.incoming);
  return ctx;
}

async function categorize(ctx: Context): Promise<Context> {
  ctx.category = await ai.categorize(ctx.incoming.body, categories);
  return ctx;
}

async function extractType(ctx: Context): Promise<Context> {
  ctx.docType = await ai.extractType(ctx.incoming.body, types);
  return ctx;
}

async function persistDoc(ctx: Context): Promise<Context> {
  if (!ctx.user || !ctx.category || !ctx.docType) return ctx;

  ctx.doc = {
    id: 'doc_' + Date.now().toString(36),
    userId: ctx.user.id,
    category: ctx.category,
    type: ctx.docType,
    content: ctx.incoming.body,
    createdAt: Date.now()
  };

  await db.saveDoc(ctx.doc);
  return ctx;
}

async function buildReply(ctx: Context): Promise<Context> {
  if (!ctx.category || !ctx.docType) return ctx;
  ctx.reply = await ai.reply(ctx.category, ctx.docType);
  return ctx;
}

async function dispatchReply(ctx: Context): Promise<Context> {
  if (ctx.reply && ctx.user) {
    await twilio.sendMessage(ctx.user.phone, ctx.reply);
  }
  return ctx;
}

export const steps = {
  loadUser,
  logIncoming,
  categorize,
  extractType,
  persistDoc,
  buildReply,
  dispatchReply
};
