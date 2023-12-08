import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string;
    // @ts-ignore
    if (exception?.response.message instanceof Array) {
      // @ts-ignore
      message = exception?.response.message.join(',');
    } else {
      // @ts-ignore
      message = exception?.response;
    }

    response.status(statusCode).json({
      statusCode: statusCode,
      path: request.path,
      message: message
    });
  }
}
