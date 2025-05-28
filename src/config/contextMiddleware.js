import { requestContext } from './context.js';

export function contextMiddleware(req, res, next) {
  requestContext.run(() => {
    next();
  });
}