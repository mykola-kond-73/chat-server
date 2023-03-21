import { UsersService } from './users.service';
import { Controller, Delete, Get, Param, } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserDto } from './dto/get-user.dto';
import { ErrorDto } from '../exceptions/dto/error.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Користувачі')
@ApiHeader({ name: 'authorization', description: 'Заголовок з токеном для авторизації', required: true, example: 'Bearer:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCAxNi4wMyIsImVtYWlsIjoiZW1haWxfMTExQGVtYWlsLmNvbSIsImlkIjoiZDc4NDE5ZjUtMDkxMC00ZjEyLTk3MDEtZWI0NWVmOWNiNDQ0IiwiaWF0IjoxNjc5MjM4ODM3LCJleHAiOjE2NzkyNDA2Mzd9.mwVixHJYpiikCPJNXmWbY1MWV3TDRMStB0esJLwGKCQ' })
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) { }

  @ApiOperation({ summary: 'Запит користувача за його Id' })
  @ApiParam({ name: 'userId', description: 'Id користувача', required: true, example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' })
  @ApiResponse({ status: 200, description: 'Користувач успішно створений', type: GetUserDto })
  @ApiResponse({ status: 400, type: ErrorDto })
  @Get(':userId')
  getUser(@Param() params) {
    try {
      return this.usersService.getUserById(params.userId)
    } catch (error) {
      throw error
    }
  }

  @ApiOperation({ summary: 'Видалити користувача за його Id' })
  @ApiParam({ name: 'userId', description: 'Id користувача', required: true, example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, type: ErrorDto })
  @Delete(':userId')
  deleteUser(@Param() params) {
    try {
      return this.usersService.deleteUser(params.userId)
    } catch (error) {
      throw error
    }
  }
}
