import {MiddlewareConsumer,Module,NestModule,} from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { Room } from '../rooms/rooms.model';
import { DecryptMiddleware } from './decrypt.middleware';
import { MessagesController } from './messages.controller';
import { Message } from './messages.model';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports: [
    SequelizeModule.forFeature([Message, Room]),
    AuthModule,
  ],
  exports: [MessagesService],
})
export class MessagesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DecryptMiddleware).forRoutes('messages');
  }
}
