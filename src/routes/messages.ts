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

const retrieveQueryOpts = (req: Request, res: Response): MessageFilterOptions => {
  const { id: recipientId } = res.locals.user;
  const opts: MessageFilterOptions = {
    recipient: recipientId,
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
  res.json(messages);
});

router.get('/:sender', async (req, res, next) => {
  const sender = parseInt(req.params.sender, 10);
  if (Number.isNaN(sender)) {
    return next(createError(400));
  }
  const messages = await messagesController.getMessages({ ...retrieveQueryOpts(req, res), sender });
  res.json(messages);
});

export default router;
