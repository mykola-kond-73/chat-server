import { JwtService } from '@nestjs/jwt';
import {CanActivate,ExecutionContext,Injectable,UnauthorizedException,HttpStatus} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService:JwtService
    ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const token=req.headers.authorization

      const [tokenType, tokenBody] = token.split(':');
      if (tokenType != 'Bearer' || !tokenBody) throw new UnauthorizedException(HttpStatus.UNAUTHORIZED)

      const user = this.jwtService.verify(tokenBody, { secret: process.env.PRIVATE_KEY_JWT_ACCESS_TOKEN})
      req.user = user

      return true
    } catch (error) {
      throw new UnauthorizedException(HttpStatus.UNAUTHORIZED)
    }
  }
}
