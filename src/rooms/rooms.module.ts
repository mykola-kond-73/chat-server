import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from '../users/users.service';
import { AuthModule } from '../auth/auth.module';
import { Message } from '../messages/messages.model';
import { User } from '../users/users.model';
import { UsersModule } from '../users/users.module';
import { RoomsController } from './rooms.controller';
import { Room } from './rooms.model';
import { RoomsService } from './rooms.service';
import { forwardRef } from '@nestjs/common/utils';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports: [
    SequelizeModule.forFeature([Room, Message, User]),
    AuthModule,
    UsersModule,
  ],
  exports: [RoomsService],
})
export class RoomsModule {}
