import { Body, Controller, Headers, Post, Session, UsePipes } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ErrorDto } from 'src/exceptions/dto/error.dto';
import { ResponceCreateUserDto } from 'src/users/dto/responce-create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизація')
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){

    }

    @ApiOperation({summary:'Авторизація користувача'})
    @ApiHeader({name: 'Authorization',description: 'Заголовок з логіном і паролем для авторизації',required:true,example:'user_1@email.com:user_password'})
    @ApiResponse({status:200,description:'Створено сесію з токеном'})
    @ApiResponse({status:400,type:ErrorDto})
    @Post('/login')
    login(@Headers() headers,@Session() session){
        return this.authService.login(headers.authorization,session)
    }

    @ApiOperation({summary:'Створення користувача'})
    @ApiResponse({status:201,description:'Користувач успішно створений',type:ResponceCreateUserDto})
    @ApiResponse({status:400,type:ErrorDto})
    @UsePipes(ValidationPipe)
    @Post('/register')
    register(@Body() dto:CreateUserDto){
        const user=this.authService.register(dto)
        return user
    }

}

