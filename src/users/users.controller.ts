import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

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
    @Get(':userId')
    getUser(@Param() params){
        return this.usersService.getUser(params.userId)
    }

    @ApiOperation({summary:'Видалити користувача за його Id'})
    @Delete(':userId')
    deleteUser(@Param() params){
        return this.usersService.deleteUser(params.userId)
    }
}
