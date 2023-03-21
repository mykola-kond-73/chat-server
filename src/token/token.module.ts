import { SequelizeModule } from "@nestjs/sequelize";
import {forwardRef, Module} from '@nestjs/common';
import { Token } from "./token.model";
import { TokenService } from "./token.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { jwtTokenOpt } from "../utils/options/jwt-token";
import { AuthModule } from "../auth/auth.module";

@Module({
    controllers: [],
    providers: [TokenService],
    imports: [
        SequelizeModule.forFeature([Token]),
        forwardRef(() => AuthModule),
    ],
    exports: [TokenService],
  })
export class TokenModule {}