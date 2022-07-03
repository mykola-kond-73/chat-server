import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserDto } from './dto/get-user.dto';
import { ErrorDto } from '../exceptions/dto/error.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ResponceCreateUserDto } from './dto/responce-create-user.dto';


@ApiTags('Користувачі')
// @UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService){

    }
    
    @ApiOperation({summary:'Запит користувача за його Id'})
    @ApiParam({name:'userId',description:'Id користувача',required:true,example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'})
    @ApiResponse({status:200,description:'Користувач успішно створений',type:GetUserDto})
    @ApiResponse({status:400,type:ErrorDto})
    @Get(':userId')
    getUser(@Param() params){
        return this.usersService.getUserById(params.userId)
    }

    @ApiOperation({summary:'Видалити користувача за його Id'})
    @ApiParam({name:'userId',description:'Id користувача',required:true,example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'})
    @ApiResponse({status:200})
    @ApiResponse({status:400,type:ErrorDto})
    @Delete(':userId')
    deleteUser(@Param() params){
        return this.usersService.deleteUser(params.userId)
    }
}
