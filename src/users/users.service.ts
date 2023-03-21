import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { v4 as uuidv4 } from 'uuid'
import { bcryptGenHash, bcryptGenSalt } from '../utils/bcryptPromise';
const bcrypt = require('bcryptjs');

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
    ) { }

    async createUser(dto: CreateUserDto) {
        const cloneUser=await this.userRepository.findOne({ where: { email: dto.email } })
        if(cloneUser) throw new HttpException('Користувач з таким E-mail вже існує', HttpStatus.BAD_REQUEST)

        const salt = await bcryptGenSalt()

        const newDto = {
            ...dto,
            password: await bcryptGenHash(dto.password, salt),
            id: uuidv4()
        }
        const user = await this.userRepository.create(newDto)

        if (!user) throw new HttpException('Помилка при створенні користувача', HttpStatus.BAD_REQUEST)
        return { userId: user.id }
    }

    async getUserById(userId: string) {
        const user = await this.userRepository.findOne({ where: { id: userId }, attributes: ['name', 'id'] })

        if (!user) throw new HttpException('Користувача не знайдено', HttpStatus.BAD_REQUEST)
        return user
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email: email } })
        if (!user) throw new HttpException('Користувача не знайдено', HttpStatus.BAD_REQUEST)
        
        return user
    }

    async deleteUser(userId: string) {
        const user = await this.userRepository.destroy({ where: { id: userId } })

        if (!user) throw new HttpException('Користувача не знайдено', HttpStatus.BAD_REQUEST)
        return true
    }

    async validateUser(email: string, password: string) {
        const candidate = await this.getUserByEmail(email)
        if (!candidate) throw new HttpException('Користувач не знайдений', HttpStatus.BAD_REQUEST)

        const passwordEquals = await bcrypt.compare(password, candidate.password)
        if (!passwordEquals) throw new HttpException('Невірний пароль', HttpStatus.BAD_REQUEST)

        return candidate
    }
}
