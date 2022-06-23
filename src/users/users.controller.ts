import { UsersService } from './users.service';
import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserDto } from './dto/get-user.dto';
import { ErrorDto } from './dto/error.dto';
import { AuthGuard } from 'src/auth/auth.guard';


@ApiTags('Користувачі')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService){

    }

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
