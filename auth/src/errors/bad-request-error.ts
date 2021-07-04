import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode = 404;
  constructor(private reason: string) {
    super(reason);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeErrors() {
    return [{ message: this.reason }];
  }
}
