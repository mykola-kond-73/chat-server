import { Injectable, HttpStatus, UnauthorizedException, HttpException, } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { TokenService } from '../token/token.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService
  ) { }

  async login(dto: LoginDto) {
    const user = await this.usersService.validateUser(dto.email, dto.password);
    const { accessToken, refreshToken } = this.tokenService.generateTokens(user);
    
    const saveTokenDto = {
      userId: user.id,
      refreshToken
    }

    await this.tokenService.saveToken(saveTokenDto)

    return {
      userId: user.id,
      accessToken,
      refreshToken
    }
  }

  async unlogin(token: string) {
    if(!token) return true
    const tokenData = await this.tokenService.removeToken(token)
    if (!tokenData) throw new UnauthorizedException(HttpStatus.UNAUTHORIZED);
    return true
  }

  async register(dto: CreateUserDto) {
    return await this.usersService.createUser(dto);
  }

  async refresh(token: string) {
    if (!token) throw new HttpException('Ви не авторизовані', HttpStatus.BAD_REQUEST)

    const userData = this.tokenService.validateRefreshToken(token)
    const tokenFromDb = this.tokenService.findToken(token)

    if (!userData || !tokenFromDb) throw new HttpException('Ви не авторизовані', HttpStatus.BAD_REQUEST)

    const { accessToken, refreshToken } = this.tokenService.generateTokens(userData);

    const saveTokenPayload = {
      userId: userData.id,
      refreshToken
    }
    await this.tokenService.saveToken(saveTokenPayload)

    return {
      userId: userData.id,
      accessToken,
      refreshToken
    };
  }
}
