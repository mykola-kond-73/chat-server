import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './rooms.model';
import { v4 as uuidv4 } from 'uuid'
import { roomByIdType } from '../utils/types/rooms';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';

@Injectable()
export class RoomsService {
    constructor(
        @InjectModel(Room) private roomRepository: typeof Room,
        private usersRepository: UsersService
    ) { }

    async createRoom(dto: CreateRoomDto) {
        const user = await this.usersRepository.getUserByEmail(dto.clientId_2)
        const roomsClone = await this.roomRepository.findAll({ where: { [Op.or]: [{ clientId_1: dto.clientId_1, clientId_2: user.id }, { clientId_1: user.id, clientId_2: dto.clientId_1 }] } })
        if ((dto.clientId_1 == user.id) || (roomsClone.length > 0)) throw new HttpException('Помилка при створенні кімнати', HttpStatus.BAD_REQUEST)

        const newDto = {
            ...dto,
            clientId_2: user.id,
            id: uuidv4()
        }
        const room = await this.roomRepository.create(newDto)

        if (!room) throw new HttpException('Помилка при створенні кімнати', HttpStatus.BAD_REQUEST)
        return { roomId: room.id }
    }

    async getAllUserRooms(userId: string) {
        const rooms = await this.roomRepository.findAll({
            where: { [Op.or]: [{ clientId_1: userId }, { clientId_2: userId }] },
            include: [
                { model: User, as: 'user_1', attributes: ['id', 'name'] },      //? підключення по псевдоніму
                { model: User, as: 'user_2', attributes: ['id', 'name'] }
            ]
        })
        // if (rooms.length == 0) throw new HttpException('Кімнати не знайдено', HttpStatus.BAD_REQUEST)
        return rooms
    }

    async getRoomById(payload: roomByIdType) {
        const room = await this.roomRepository.findOne({
            where: {
                id: payload.roomId,
                [Op.or]: [
                    { clientId_1: payload.userId },
                    { clientId_2: payload.userId }
                ]
            }
        })

        if (!room) throw new HttpException('Кімнату не знайдено', HttpStatus.BAD_REQUEST)
        return room
    }

    async deleteRoomById(payload: roomByIdType) {
        const room = await this.roomRepository.destroy(
            {
                where: {
                    id: payload.roomId,
                    [Op.or]: [
                        { clientId_1: payload.userId },
                        { clientId_2: payload.userId }
                    ]
                }
            }
        )
        if (!room) throw new HttpException('Кімнату не знайдено', HttpStatus.BAD_REQUEST)
        return true
    }
}