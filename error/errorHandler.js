const { StatusCodes } = require("http-status-codes");

/**
 * Async Error Handler to capture and return error to end user. [Error Handler]
 * @param err: Error
 * @param req: Request
 * @param res: Response
 * @param next: NextFunction
 * @returns 
 */

const errorHandler = (err, req, res, next) => {

  let { httpCode, message } = err;

  res.locals.errorMessage = err.message;

  if (!message) message = 'Internal Server Error!';
  if (!httpCode) httpCode = StatusCodes.INTERNAL_SERVER_ERROR;

  const response = {
    status: false,
    httpCode,
    message,
    ...({ stack: err.stack }),
  };

  return res.status(httpCode).send(response);
};

module.exports = {
  errorHandler
};