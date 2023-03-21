import { ResponceGetRoomsDto } from './dto/responce-get-rooms.dto';
import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ErrorDto } from '../exceptions/dto/error.dto';
import { roomByIdType } from '../utils/types/rooms';
import { CreateRoomDto } from './dto/create-room.dto';
import { ResponceCreateRoomDto } from './dto/responce-create-room.dto';
import { RoomsService } from './rooms.service';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('Чати')
@ApiHeader({ name: 'authorization', description: 'Заголовок з токеном для авторизації', required: true, example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' })
// @UseGuards(AuthGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) { }

  @ApiOperation({ summary: 'Створення кімнати' })
  @ApiResponse({ status: 201, description: 'Користувач успішно створений', type: ResponceCreateRoomDto })
  @ApiResponse({ status: 400, type: ErrorDto })
  @UsePipes(ValidationPipe)
  @Post()
  createRoom(@Body() dto: CreateRoomDto) {
    try {
      return this.roomsService.createRoom(dto)
    } catch (error) {
      throw error
    }
  }

  @ApiOperation({ summary: 'Отримання кімнат' })
  @ApiParam({ name: 'userId', description: 'Id користувача', required: true, example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' })
  @ApiResponse({ status: 200, description: 'Успішний запит на всі чати користувача', type: [ResponceGetRoomsDto] })
  @ApiResponse({ status: 400, type: ErrorDto })
  @Get(':userId')
  getRooms(@Param('userId') userId) {
    try {
      return this.roomsService.getAllUserRooms(userId)
    } catch (error) {
      throw error
    }
  }

  @ApiOperation({ summary: 'Видалити кімнату за її Id' })
  @ApiParam({ name: 'roomId', description: 'Id кімнати', required: true, example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' })
  @ApiQuery({ name: 'userId', description: 'Id учасника кімнати', required: true, example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, type: ErrorDto })
  @Delete(':roomId')
  deleteRoom(@Param('roomId') roomId, @Query('userId') userId) {
    try {
      const payload: roomByIdType = {
        roomId,
        userId,
      };
      return this.roomsService.deleteRoomById(payload)
    } catch (error) {
      throw error
    }
  }
}