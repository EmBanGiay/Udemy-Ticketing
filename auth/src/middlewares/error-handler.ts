import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';
import { NotFoundError } from '../errors/not-found-error';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //if bad gateway or bad request does not have any meanings then debug here

    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    console.log(err);
    res.status(400).send({
       errors: [{message: 'Something went wrong'}]
    });

};

