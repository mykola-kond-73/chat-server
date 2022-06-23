import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class DefaultExceptions implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        const context=host.switchToHttp()
        const res=context.getResponse()
        const status=exception.getStatus()
        const message=exception.message
        
        console.log()
        console.log(exception.stack)
        console.log()

        res.status(status).json({message})
    }

}