import { Injectable, HttpException, HttpStatus, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateNoteDto } from './dto/create-note.dto';
import { Token } from './token.model';
import { v4 as uuidv4 } from 'uuid'
import { User } from '../users/users.model';
import { UserTokenDto } from './dto/user-token-data.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token) private tokenRepository: typeof Token,
    private jwtService: JwtService
  ) { }

  async saveToken(dto: CreateNoteDto) {
    const note = await this.tokenRepository.findOne({ where: { userId: dto.userId } })
    if (note) {
      const updateNote = await this.tokenRepository.update(
        { refreshToken: dto.refreshToken },
        { where: { userId: dto.userId } }
      )

      if (updateNote[0] != 1) throw new HttpException('Невдалося оновити нотаток', HttpStatus.BAD_REQUEST)
    } else {
      const newDto = {
        ...dto,
        id: uuidv4()
      }
      const token = await this.tokenRepository.create(newDto)

      if (!token) throw new HttpException('Помилка при створенні нотатка', HttpStatus.BAD_REQUEST)
    }

    return true
  }

  generateTokens(user: User) {
    const dtoUserData = new UserTokenDto(user)
    const accessToken = this.jwtService.sign({...dtoUserData}, { secret: process.env.PRIVATE_KEY_JWT_ACCESS_TOKEN, expiresIn: process.env.ACCESS_TIKEN_LIFE_TIME})
    const refreshToken = this.jwtService.sign({...dtoUserData}, { secret: process.env.PRIVATE_KEY_JWT_REFRESH_TOKEN, expiresIn:process.env.REFRESH_TOKEN_LIFE_TIME})
    return {
      accessToken,
      refreshToken
    }
  }

  validateAccessToken(token: string) {
    try {
      const userData = this.jwtService.verify(token, { secret: process.env.PRIVATE_KEY_JWT_ACCESS_TOKEN })
      return userData
    } catch (error) {
      return null
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = this.jwtService.verify(token, { secret: process.env.PRIVATE_KEY_JWT_REFRESH_TOKEN })
      return userData
    } catch (error) {
      return null
    }
  }

  validateAccessTokenForSokets(token:string){
    const [tokenType, tokenBody] = token.split(':');
    if (tokenType != 'Bearer' || !tokenBody) throw new UnauthorizedException(HttpStatus.UNAUTHORIZED)

    const userData=this.validateAccessToken(tokenBody)
    if (!userData) throw new UnauthorizedException(HttpStatus.UNAUTHORIZED);
    return true
  }

  async findToken(token: string) {
    const data = await this.tokenRepository.findOne({ where: { refreshToken: token } })

    if (!data) throw new HttpException('Токен не знайдено', HttpStatus.BAD_REQUEST)
    return data
  }

  async removeToken(token: string) {
    const data = await this.tokenRepository.destroy({ where: { refreshToken: token } })

    if (!data) throw new HttpException('При видаленні токена сталася помилка', HttpStatus.BAD_REQUEST)
    return true
  }
}