import { HttpException, HttpStatus} from "@nestjs/common";

export class ValidationException extends HttpException {
    message:string
    constructor(responce:any){
        super(responce,HttpStatus.BAD_REQUEST)
        this.message=responce
    }
}