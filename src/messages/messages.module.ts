import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MessagesController } from './messages.controller';
import { Message } from './messages.model';
import { MessagesService } from './messages.service';

@Module({
  controllers:[MessagesController],
  providers: [MessagesService],
  imports:[
    SequelizeModule.forFeature([Message]),

  ],
  exports:[MessagesService]
})
export class MessagesModule {}
