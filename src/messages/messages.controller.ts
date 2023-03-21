import { getMessagesByRoomIdType, updateMessageByIdType, deleteMessageById } from '../utils/types/messages';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorDto } from '../exceptions/dto/error.dto';
import { GetMessagesDto } from './dto/get-messages.dto';
import { MessagesService } from './messages.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Повідомлення')
@ApiHeader({name: 'authorization',description: 'Заголовок з токеном для авторизації',required: true,example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'})
@UseGuards(AuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) { }

  @Post()
  createMessage(@Body() body) {
    try {
      return this.messagesService.createMessage(body)
    } catch (error) {
      throw error
    }
  }

  @ApiOperation({ summary: 'Запит повідомлень за Id кімнати' })
  @ApiParam({ name: 'roomId', description: 'Id кімнати', required: true, example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' })
  @ApiQuery({ name: 'page', description: 'Номер сторінки повідомлень', required: true, example: '1' })
  @ApiQuery({ name: 'count', description: 'К-сть повідомлень на сторінці', required: true, example: '100', })
  @ApiResponse({ status: 200, description: 'Повідомлення успішно отримані', type: GetMessagesDto, })
  @ApiResponse({ status: 400, type: ErrorDto })
  @Get(':roomId')
  getMessages(@Param() params, @Query() query) {
    try {
      const payload: getMessagesByRoomIdType = {
        roomId: params.roomId,
        page: Number(query.page),
        count: Number(query.count),
      };
      return this.messagesService.getMessagesByRoomId(payload)
    } catch (error) {
      throw error
    }
  }

  @ApiOperation({ summary: 'Оновлення повідомлення за його Id ' })
  @ApiParam({ name: 'messageId', description: 'Id повідомлення яке треба оновити', required: true, example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' })
  @ApiBody({ type: UpdateMessageDto, required: true, description: 'Новий вміст повідомлення' })
  @ApiResponse({ status: 200, description: 'Повідомлення успішно оновлене', type: GetMessagesDto })
  @ApiResponse({ status: 400, type: ErrorDto })
  @Put(':messageId')
  updateMessage(@Param() params, @Body() body) {
    try {
      const payload: updateMessageByIdType = {
        messageId: params.messageId,
        newMessage: body.newMessage,
      };
      return this.messagesService.updateMessageById(payload)
    } catch (error) {
      throw error
    }
  }

  @ApiOperation({ summary: 'Видалити повідомлення за його Id' })
  @ApiParam({ name: 'messageId', description: 'Id повідомлення', required: true, example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' })
  @ApiQuery({ name: 'authorId', description: 'Id автора повідомлення', required: true, example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, type: ErrorDto })
  @Delete(':messageId')
  deleteUser(@Param() params, @Query() query) {
    try {
      const payload: deleteMessageById = {
        messageId: params.messageId,
        authorId: query.authorId,
      };
      return this.messagesService.deleteMessageById(payload);
    } catch (error) {
      throw error
    }
  }
}
