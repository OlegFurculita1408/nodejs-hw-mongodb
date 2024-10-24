import { isHttpError } from 'http-errors';

export const errorHandlerMiddleware = (err, req, res, next) => {
  if (isHttpError(err)) {
    res.status(err.status || 500).json({
      status: err.status || 500,
      message: err.message || 'Internal Server Error',
      data: err
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message
  });
};