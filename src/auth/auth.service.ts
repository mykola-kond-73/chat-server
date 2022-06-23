import { JwtService } from '@nestjs/jwt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
const bcrypt=require('bcryptjs')

@Injectable()
export class AuthService {
    constructor(private usersService:UsersService,
        private jwtService:JwtService
    ){

    }

    async login(autorizeStr,session){
        const [email,password]=autorizeStr.split(':')
        const user=await this.validateUser(email,password)
        const token= await this.genToken(user)
        session.auth=token

        return true
    }

    async register(dto:CreateUserDto){
        return await this.usersService.createUser(dto)
    }

    private async genToken(user:User){
        const payload={emai:user.email,id:user.id,name:user.name}
        const token=await this.jwtService.sign(payload) 
        return{
            token:`Bearer:${token}`
        }
    }

    private async validateUser(email,password){
        const candidate=await this.usersService.getUserByEmail(email)
        if(!candidate){
            throw new HttpException('Користувач не знайдений',HttpStatus.BAD_REQUEST)
        }
        const passwordEquals=await bcrypt.compare(password,candidate.password)
        if(!passwordEquals){
            throw new HttpException('Невірний пароль',HttpStatus.BAD_REQUEST)
        }
        return candidate
    }
}
