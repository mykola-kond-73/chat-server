import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { jwtTokenOpt } from 'src/utils/options/jwt-token';

@Module({
    controllers:[AuthController],
    providers:[AuthService],
    imports:[
        JwtModule.register(jwtTokenOpt),
        forwardRef(()=>UsersModule)
    ],
    exports:[JwtModule]
})
export class AuthModule {}
