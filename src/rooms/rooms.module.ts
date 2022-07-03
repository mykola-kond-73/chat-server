import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Message } from 'src/messages/messages.model';
import { RoomsController } from './rooms.controller';
import { Room } from './rooms.model';
import { RoomsService } from './rooms.service';

@Module({
  controllers: [RoomsController],
  providers:[RoomsService],
  imports:[
    SequelizeModule.forFeature([Room,Message]),
    AuthModule
  ],
  exports:[RoomsService]
})
export class RoomsModule {}
