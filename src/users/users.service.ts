import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { v4 as uuidv4 } from 'uuid'
import { bcryptGenHash, bcryptGenSalt } from 'src/utils/bcryptPromise';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {

    }

    async createUser(dto: CreateUserDto) {
        try {
            const salt = await bcryptGenSalt()

            const newDto = {
                ...dto,
                password: await bcryptGenHash(dto.password, salt),
                id: uuidv4()
            }

            const user = await this.userRepository.create(newDto)
            return { userId: user.id }
        } catch (error) {
            throw new HttpException('Помилка при створенні користувача', HttpStatus.BAD_REQUEST)
        }
    }

    async getUserById(userId: string) {
        try {
            const user = await this.userRepository.findOne({ where: { id: userId }, attributes: ['name', 'id'] })
            if (user) return user
            else throw new HttpException('', HttpStatus.BAD_REQUEST)
        } catch (error) {
            throw new HttpException('Користувача не знайдено', HttpStatus.BAD_REQUEST)
        }
    }

    async getUserByEmail(email: string) {
        try {
            const user = await this.userRepository.findOne({ where: { email: email } })
            if (user) return user
            else throw new HttpException('', HttpStatus.BAD_REQUEST)
        } catch (error) {
            throw new HttpException('Користувача не знайдено', HttpStatus.BAD_REQUEST)
        }
    }

    async deleteUser(userId: string) {
        try {
            const user = await this.userRepository.destroy({ where: { id: userId } })
            if (user) return
            else throw new HttpException('', HttpStatus.BAD_REQUEST)
        } catch (error) {
            throw new HttpException('Користувача не знайдено', HttpStatus.BAD_REQUEST)
        }
    }
}
