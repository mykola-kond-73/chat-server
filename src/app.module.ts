import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { configOpt } from './options/config';
import { User } from './users/users.model';
import { WinstonModule } from 'nest-winston';
import { winstonOpt } from './options/winston';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot(configOpt),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_DB,
      models: [User],
      autoLoadModels: true
    }),
    WinstonModule.forRoot(winstonOpt),

    UsersModule,

    AuthModule
  ],
})
export class AppModule { }
