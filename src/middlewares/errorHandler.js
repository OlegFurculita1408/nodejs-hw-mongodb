import { isHttpError } from 'http-errors';
import { MongooseError } from 'mongoose';

export const errorHandlerMiddlelware = (err, req, res, next) => {
    if (isHttpError(err)) {
        next(res.status(err.status)).json({
            message:err.name,
            error: err.massage,
        });
    }
    if (err instanceof MongooseError) {
        return res.status(500).json({
        message: 'MonggooseError',
        error: err.message,
        });
    }
    res.status(500).json({
        message: 'Something went wrong',
        error: err.message,
    });
}