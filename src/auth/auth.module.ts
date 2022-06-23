import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { jwtTokenOpt } from 'src/options/jwt-token';

@Module({
    controllers:[AuthController],
    providers:[AuthService],
    imports:[
        JwtModule.register(jwtTokenOpt),
        UsersModule
    ],
    exports:[]
})
export class AuthModule {}
