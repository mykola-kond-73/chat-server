import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { RoomsController } from './rooms.controller';
import { Room } from './rooms.model';
import { RoomsService } from './rooms.service';

@Module({
  controllers: [RoomsController],
  providers:[RoomsService],
  imports:[
    SequelizeModule.forFeature([Room]),
    AuthModule
  ],
  exports:[RoomsService]
})
export class RoomsModule {}
