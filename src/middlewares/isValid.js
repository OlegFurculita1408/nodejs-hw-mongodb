import mongoose from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return next(createHttpError(400, 'Invalid contact ID'));
  }
  next();
};

// import { isValidObjectId } from 'mongoose';
// import createHttpError from 'http-errors';

// export const isValidId = (req, res, next) => {
//   const { contactId } = req.params;
//   if (!isValidObjectId(contactId)) {
//     throw createHttpError(400, 'Bad Request!');
//   }

//   next();
// };