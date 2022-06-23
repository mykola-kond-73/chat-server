import { DefaultExceptions } from './../exceptions/default.exception';
import { Body, Controller, Headers, Post, Session, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизація')
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){

    }

    @ApiOperation({summary:'Авторизація користувача'})
    @Post('/login')
    login(@Headers() headers,@Session() session){
        return this.authService.login(headers.authorization,session)
    }

    @ApiOperation({summary:'Створення користувача'})
    @Post('/register')
    register(@Body() dto:CreateUserDto){
        const user=this.authService.register(dto)
        return user
    }

}
