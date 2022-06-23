import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { ErrorDto } from './dto/error.dto';

@ApiTags('Користувачі')
@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService){

    }

    // @ApiOperation({summary:'Створення користувача'})
    // // @ApiResponse({status:201,type:})
    // @Post()
    // async create(@Body() dto:CreateUserDto){
    //     const user=await this.usersService.createUser(dto)
    //     return user
    // }

    @ApiOperation({summary:'Запит користувача за його Id'})
    @ApiResponse({status:200,description:'Користувач успішно створений',type:GetUserDto})
    @ApiResponse({status:400,type:ErrorDto})
    @Get(':userId')
    getUser(@Param() params){
        return this.usersService.getUserById(params.userId)
    }

    @ApiOperation({summary:'Видалити користувача за його Id'})
    @ApiResponse({status:200})
    @ApiResponse({status:400,type:ErrorDto})
    @Delete(':userId')
    deleteUser(@Param() params){
        return this.usersService.deleteUser(params.userId)
    }
}
