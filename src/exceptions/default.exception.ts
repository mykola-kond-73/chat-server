import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { errorLogger } from "src/utils/logger";

@Catch(HttpException)
export class DefaultExceptions implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        const context=host.switchToHttp()
        const res=context.getResponse()
        const status=exception.getStatus()
        const message=exception.message
        
        errorLogger.error(`${status} ${message}`)

        res.status(status).json({message})
    }

}