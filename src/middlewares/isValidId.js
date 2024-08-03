import createError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export function isValidId(req, res, next) {
  const { contactsId } = req.params;
  if (isValidObjectId(contactsId) === false) {
    next(createError(400, 'Bad request: ID is not valid'));
  }
  next();
}
