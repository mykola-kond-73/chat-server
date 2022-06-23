import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { MessagesController } from './messages.controller';
import { Message } from './messages.model';
import { MessagesService } from './messages.service';

@Module({
  controllers:[MessagesController],
  providers: [MessagesService],
  imports:[
    SequelizeModule.forFeature([Message]),
    AuthModule
  ],
  exports:[MessagesService]
})
export class MessagesModule {}
