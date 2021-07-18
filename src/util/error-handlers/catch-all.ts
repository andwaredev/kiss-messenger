import { ErrorRequestHandler } from 'express';
import type { HttpError } from 'http-errors';

const generalErrHandler: ErrorRequestHandler = (err: HttpError | Error, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  let statusCode: HttpError['statusCode'] = 500;
  if ('statusCode' in err) {
    statusCode = err.statusCode;
  }
  res.status(statusCode);
  res.json({
    statusCode,
    message: err.message,
  });
};

export default generalErrHandler;
