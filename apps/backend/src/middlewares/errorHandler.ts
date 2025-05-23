import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../utils/errors';

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof ZodError) {
    res.status(400).json({ errors: err.errors, message: 'Validation error' });
    return;
  }

  if (err.name === 'ClerkExpressRequireAuthError') {
    res.status(401).json({ message: 'Unauthorized: Authentication required.' });
    return;
  }

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  res.status(500).json({ message: 'Something went wrong!' });
};

export { errorHandler };
