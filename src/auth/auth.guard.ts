import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, HttpStatus, Headers } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService:JwtService){
    
  }

  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    
    try {
      //! в продакшені
      // const token = req.session.auth.token
      //!
      const token=req.headers.authorization

      const [tokenType, tokenBody] = token.split(':')

      if (tokenType != 'Bearer' || !tokenBody) {
        throw new UnauthorizedException(HttpStatus.UNAUTHORIZED)
      }

      const user = this.jwtService.verify(tokenBody)
      req.user = user

      return true

    } catch (error) {
      throw new UnauthorizedException(HttpStatus.UNAUTHORIZED)
    }


  }
}
