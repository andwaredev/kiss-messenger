import { RequestHandler } from 'express';
import createError from 'http-errors';

const notFoundHandler: RequestHandler = (_req, res) => {
  const notFoundErr = createError(404);
  res.status(notFoundErr.statusCode);
  res.json({
    statusCode: notFoundErr.statusCode,
    message: notFoundErr.message,
  });
};

export default notFoundHandler;
