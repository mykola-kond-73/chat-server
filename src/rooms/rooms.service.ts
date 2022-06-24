import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './rooms.model';
import { v4 as uuidv4 } from 'uuid'
import { deleteRoomByIdType } from 'src/utils/types/rooms';

@Injectable()
export class RoomsService {
    constructor(@InjectModel(Room) private roomRepository: typeof Room) {

    }

    async createRoom(dto: CreateRoomDto) {
        try {
            const newDto = {
                ...dto,
                id: uuidv4()
            }
            const room = await this.roomRepository.create(newDto)
            if (room) return { roomId: room.id }
            else throw new HttpException('', HttpStatus.BAD_REQUEST)
        } catch (error) {
            throw new HttpException('Помилка при створенні кімнати', HttpStatus.BAD_REQUEST)
        }
    }

    async getAllUserRooms(userId: string) {
        try {
            const rooms = await this.roomRepository.findAll({ where: { [Op.or]: [{ clientId_1: userId }, { clientId_2: userId }] } })
            if (rooms.length != 0) return rooms
            else throw new HttpException('', HttpStatus.BAD_REQUEST)
        } catch (error) {
            throw new HttpException('Кімнати не знайдено', HttpStatus.BAD_REQUEST)
        }
    }

    async deleteRoomById(payload: deleteRoomByIdType) {
        try {
            const room = await this.roomRepository.destroy(
                {
                    where: {
                        id: payload.roomId,
                        [Op.or]: [
                            {clientId_1:payload.userId},
                            {clientId_2:payload.userId}
                        ]
                    }
                }
            )
            if(room) return 
            else throw new HttpException('', HttpStatus.BAD_REQUEST)
        } catch (error) {
            throw new HttpException('Кімнату не знайдено', HttpStatus.BAD_REQUEST)
        }
    }
}
