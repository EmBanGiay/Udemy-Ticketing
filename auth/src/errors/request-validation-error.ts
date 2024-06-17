import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode = 400;
    
    //Instead of 'private errors: ValidationError[] we add line 5 and 7
    //errors: ValidationError[]
    constructor(public errors: ValidationError[]) {
        //this.errors = errors;
        super('Invalid request parameters');

        //Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map((err) => {
            if (err.type === 'field'){
                return { message: err.msg, field: err.path};
            }
            return { message: err.msg};
        });
    }

}

