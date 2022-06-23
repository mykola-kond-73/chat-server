import { getMessagesByRoomIdType, updateMessageByIdType, deleteMessageById } from 'src/utils/types/messages';
import { Body, Controller, Delete, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { ErrorDto } from 'src/users/dto/error.dto';
import { GetMessagesDto } from './dto/get-messages.dto';
import { MessagesService } from './messages.service';

@ApiTags('Повідомлення')
@UseGuards(AuthGuard)
@Controller('messages')
export class MessagesController {
    constructor(private messagesService:MessagesService){

    }

    @ApiOperation({summary:'Запит повідомлень за Id кімнати'})
    @ApiResponse({status:200,description:'Повідомлення успішно отримані',type:GetMessagesDto})
    @ApiResponse({status:400,type:ErrorDto})
    @Get(':roomId')
    getMessages(@Param() params,@Query() query){
        const payload:getMessagesByRoomIdType={
            roomId:params.roomId,
            page:Number(query.page),
            count:Number(query.page)
        }
        return this.messagesService.getMessagesByRoomId(payload)
    }

    @ApiOperation({summary:'Оновлення повідомлення за його Id '})
    @ApiResponse({status:200,description:'Повідомлення успішно оновлене',type:GetMessagesDto})
    @ApiResponse({status:400,type:ErrorDto})
    @Put(':messageId')
    updateMessage(@Param() params,@Body() body){
        const payload:updateMessageByIdType={
            messageId:params.messageId,
            newMessage:body.newMessage
        }
        return this.messagesService.updateMessageById(payload)
    }

    @ApiOperation({summary:'Видалити повідомлення за його Id'})
    @ApiResponse({status:200})
    @ApiResponse({status:400,type:ErrorDto})
    @Delete(':messageId')
    deleteUser(@Param() params,@Query() query){
        const payload:deleteMessageById={
            messageId:params.messageId,
            authorId:query.authorId
        }
        return this.messagesService.deleteMessageById(payload)
    }
}
