import { ResponceGetRoomsDto } from './dto/responce-get-rooms.dto';
import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { ErrorDto } from 'src/exceptions/dto/error.dto';
import { deleteRoomByIdType } from 'src/utils/types/rooms';
import { CreateRoomDto } from './dto/create-room.dto';
import { ResponceCreateRoomDto } from './dto/responce-create-room.dto';
import { RoomsService } from './rooms.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Чати')
// @UseGuards(AuthGuard)
@Controller('rooms')
export class RoomsController {
    constructor(private roomsService:RoomsService){

    }

    @ApiOperation({summary:'Створення кімнати'})
    @ApiResponse({status:201,description:'Користувач успішно створений',type:ResponceCreateRoomDto})
    @ApiResponse({status:400,type:ErrorDto})
    @UsePipes(ValidationPipe)
    @Post()
    createRoom(@Body() dto:CreateRoomDto){
        return this.roomsService.createRoom(dto)
    }

    @ApiOperation({summary:'Створення кімнати'})
    @ApiParam({name:'userId',description:'Id користувача',required:true,example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'})
    @ApiResponse({status:200,description:'Успішний запит на всі чати користувача',type:[ResponceGetRoomsDto]})
    @ApiResponse({status:400,type:ErrorDto})
    @Get(':userId')
    getRooms(@Param('userId') userId){
        return this.roomsService.getAllUserRooms(userId)
    }

    @ApiOperation({summary:'Видалити кімнату за її Id'})
    @ApiParam({name:'roomId',description:'Id кімнати',required:true,example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'})
    @ApiQuery({name:'userId',description:'Id учасника кімнати',required:true,example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'})
    @ApiResponse({status:200})
    @ApiResponse({status:400,type:ErrorDto})
    @Delete(':roomId')
    deleteRoom(@Param('roomId') roomId, @Query('userId') userId){
        const payload:deleteRoomByIdType={
            roomId,
            userId
        }
        return this.roomsService.deleteRoomById(payload)
    }
}
