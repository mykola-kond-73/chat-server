import {ArgumentsHost,Catch,ExceptionFilter,HttpException} from '@nestjs/common'
import {authErrorLogger,errorLogger,validationErrorLogger} from '../utils/logger'

@Catch(HttpException)
export class DefaultExceptions implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const res = context.getResponse();
    const req = context.getRequest();
    const status = exception.getStatus();
    const message = exception.message;

    const stackArr = exception.stack.split(':');
    switch (stackArr[0]) {
      case 'UnauthorizedException':
        authErrorLogger.error(`${req.originalUrl} ${req.ip} ${'no tocken'}`)
        break;
      case 'ValidationException':
        validationErrorLogger.error(`${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`)
        break;
      default:
        errorLogger.error(`${stackArr[0]} ${status} ${message}`);
    }
    console.log();
    console.log(stackArr[0]);
    console.log();

    res.status(status).json({ message });
  }
}