export class appError extends Error {

  constructor(message, statusCode = 400) {
    super(message);
    this.name = 'appError';
    this.statusCode = statusCode;
  }
  
}