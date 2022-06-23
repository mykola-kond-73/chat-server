import { Injectable } from '@nestjs/common';
import {  InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import  {  v4  as  uuidv4  }  from  'uuid'
import { bcryptGenHash, bcryptGenSalt } from 'src/utils/bcryptPromise';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User){

    }

    async createUser(dto:CreateUserDto){
        const salt=await bcryptGenSalt()

        const newDto={
            ...dto,
            password:await bcryptGenHash(dto.password,salt),
            id:uuidv4 ()
        }

        const user=await this.userRepository.create(newDto)
        return user.id
    }

    async getUser(userId:string){
        return await this.userRepository.findOne({where:{id:userId},attributes:['name','id']})
    }

    async getUserByEmail(email:string){
        return await this.userRepository.findOne({where:{email:email}})
    }

    async deleteUser(userId:string){
        const user=await this.userRepository.destroy({where:{id:userId}})

        return user
    }
}
