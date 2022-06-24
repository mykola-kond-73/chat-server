import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { configOpt } from './utils/options/config';
import { User } from './users/users.model';
import { MessagesModule } from './messages/messages.module';
import { RoomsModule } from './rooms/rooms.module';
import { Message } from './messages/messages.model';
import { SocketsGateway } from './sockets/sockets.gateway';

@Module({
  controllers: [],
  providers: [SocketsGateway],
  imports: [
    ConfigModule.forRoot(configOpt),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_DB,
      models: [User,Message],
      autoLoadModels: true
    }),

    UsersModule,
    AuthModule,
    MessagesModule,
    RoomsModule
  ],
})
export class AppModule { }
