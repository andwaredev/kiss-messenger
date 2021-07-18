import express from 'express';
import createError from 'http-errors';
import MessagesController from '../controllers/messages';
import { MessagesRepository } from '../repositories/messages.repository';
const router = express.Router();

const messagesRepository = new MessagesRepository();
const messagesController = new MessagesController(messagesRepository);

router.get('/', async (_req, res, next) => {
  const { id: recipientId } = res.locals.user || {};
  if (typeof recipientId !== 'number' || Number.isNaN(recipientId)) {
    // Issues retrieving user data from request should be handled upstream
    return next(createError(500));
  }
  const messages = await messagesController.getMessagesForRecipient(recipientId);
  res.json(messages);
});

export default router;
