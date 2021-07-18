import express from 'express';
import createError from 'http-errors';
const router = express.Router();

router.get('/', (_req, res, next) => {
  const { id: recipientId } = res.locals.user || {};
  if (typeof recipientId !== 'number' || Number.isNaN(recipientId)) {
    // Issues retrieving user data from request should be handled upstream
    return next(createError(500));
  }
  console.log(`Retrieving all messages for recipient with id: ${recipientId}`);
  res.json([]);
});

export default router;
