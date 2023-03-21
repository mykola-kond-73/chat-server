import { Body, Controller, Post,Get,  UsePipes,Res,Req} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../pipes/validation.pipe';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ErrorDto } from '../exceptions/dto/error.dto';
import { ResponceCreateUserDto } from '../users/dto/responce-create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { cookieOptions } from '../utils/options/cookie';

@ApiTags('Авторизація')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiOperation({ summary: 'Авторизація користувача' })
  @ApiBody({ type: LoginDto, required: true, description: 'Авторизаційна інформація' })
  @ApiResponse({ status: 200, description: 'Створено сесію з токеном' })
  @ApiResponse({ status: 400, type: ErrorDto })
  @Post('/login')
  async login(@Body() dto: LoginDto,@Res({ passthrough: true }) res:Response) {
    try {
      const data = await this.authService.login(dto)
      res.cookie('token',data.refreshToken,cookieOptions)
      return data
    } catch (error) {
      throw error
    }
  }

  @ApiOperation({ summary: 'Вилогінити користувача' })
  @ApiResponse({ status: 200, description: 'Видалено сесію з токеном' })
  @ApiResponse({ status: 400, type: ErrorDto })
  @Post('/unlogin')
  async unlogin(@Req() req,@Res({ passthrough: true }) res:Response) {
    try {
      const token=req.cookies['token']

      const data = await this.authService.unlogin(token)
      if(token) res.clearCookie('token', cookieOptions) 

      return data
    } catch (error) {
      throw error
    }
  }

  @ApiOperation({ summary: 'Створення користувача' })
  @ApiResponse({ status: 201, description: 'Користувач успішно створений', type: ResponceCreateUserDto })
  @ApiResponse({ status: 400, type: ErrorDto })
  @ApiResponse({ status: 401, type: ErrorDto })
  @UsePipes(ValidationPipe)
  @Post('/register')
  async register(@Body() dto: CreateUserDto) {
    try {
      return await this.authService.register(dto)
    } catch (error) {
      throw error
    }
  }

  @ApiOperation({ summary: 'Заміна пари токенів' })
  @ApiResponse({ status: 200, description: 'Згенеровано нову пару токенів' })
  @ApiResponse({ status: 400, type: ErrorDto })
  @ApiResponse({ status: 401, type: ErrorDto })
  @Get('/refresh')
  async refresh(@Req() req,@Res({ passthrough: true }) res:Response) {
    try {
      const token=req.cookies['token']

      const data = await this.authService.refresh(token)
      res.cookie('token',data.refreshToken,cookieOptions)

      return data
    } catch (error) {
      throw error
    }
  }
}
