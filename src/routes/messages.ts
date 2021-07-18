import express, { Response, Request } from 'express';
import createError from 'http-errors';
import MessagesController, { MessageFilterOptions } from '../controllers/messages';
import { MessagesRepository } from '../repositories/messages.repository';
const router = express.Router();

const messagesRepository = new MessagesRepository();
const messagesController = new MessagesController(messagesRepository);

router.use('/*', (_req, res, next) => {
  const { id: recipientId } = res.locals.user || {};
  if (typeof recipientId !== 'number' || Number.isNaN(recipientId)) {
    // Issues retrieving user data from request should be handled upstream
    return next(createError(500));
  }
  return next();
});

const getAuthedUserId = (res: Response): number => {
  return res.locals.user.id;
};

const retrieveQueryOpts = (req: Request, res: Response): MessageFilterOptions => {
  const opts: MessageFilterOptions = {
    recipient: getAuthedUserId(res),
  };

  const { limit, daysElapsed } = req.query || {};
  const parsedLimit = parseInt(limit as string, 10);
  if (!Number.isNaN(parsedLimit)) {
    opts.limit = parsedLimit;
  }

  const parsedDaysElapsed = parseInt(daysElapsed as string, 10);
  if (!Number.isNaN(parsedDaysElapsed)) {
    opts.daysElapsed = parsedDaysElapsed;
  }
  return opts;
};

router.get('/', async (req, res) => {
  const messages = await messagesController.getMessages(retrieveQueryOpts(req, res));
  return res.json(messages);
});

router.get('/:sender', async (req, res, next) => {
  const sender = parseInt(req.params.sender, 10);
  if (Number.isNaN(sender)) {
    return next(createError(400));
  }
  const messages = await messagesController.getMessages({ ...retrieveQueryOpts(req, res), sender });
  return res.json(messages);
});

router.post('/', async (req, res, next) => {
  const senderId = getAuthedUserId(res);
  const { recipientId, text } = req.body;
  const parsedRecipientId = parseInt(recipientId, 10);
  if (Number.isNaN(parsedRecipientId)) {
    return next(createError(400));
  }
  if (recipientId === senderId) {
    return next(createError(400, 'Cannot send message to oneself.'));
  }
  const message = await messagesController.createMessage(senderId, parsedRecipientId, text);
  return res.json(message);
});

export default router;
