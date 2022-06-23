import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { configOpt } from './utils/options/config';
import { User } from './users/users.model';
import { MessagesController } from './messages/messages.controller';
import { MessagesModule } from './messages/messages.module';
import { RoomsService } from './rooms/rooms.service';
import { RoomsModule } from './rooms/rooms.module';

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

    UsersModule,

    AuthModule,

    MessagesModule,

  ],
})
export class AppModule { }
