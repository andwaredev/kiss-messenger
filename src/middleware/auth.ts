import { RequestHandler } from 'express';
import createError from 'http-errors';

const USER_ID_HEADER = 'X-User-Id';

// replace this with JWT impl in future
const naiveAuthMiddleware: RequestHandler = (req, res, next) => {
  const userId = parseInt(req.headers[USER_ID_HEADER.toLowerCase()] as string, 10);
  if (Number.isNaN(userId)) {
    return next(createError(400, `Invalid '${USER_ID_HEADER}' header.`));
  }
  res.locals.user = {
    id: userId,
  };
  return next();
};

export default naiveAuthMiddleware;
