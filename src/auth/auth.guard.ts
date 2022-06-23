import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService:JwtService){
    
  }

  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    try {

      const token = req.session.auth.token
      const [tokenType, tokenBody] = token.split(':')

      if (tokenType != 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Користувач не авторизований' })
      }

      const user = this.jwtService.verify(token)
      req.user = user

      return true

    } catch (error) {
      throw new UnauthorizedException({ message: 'Користувач не авторизований' })
    }


  }
}
