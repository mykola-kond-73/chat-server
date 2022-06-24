import { getMessagesByRoomIdType, updateMessageByIdType, deleteMessageById } from 'src/utils/types/messages';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorDto } from 'src/exceptions/dto/error.dto';
import { GetMessagesDto } from './dto/get-messages.dto';
import { MessagesService } from './messages.service';
import { UpdateMessageDto } from './dto/update-message.dto';

type T={
    newMessage:string
}

@ApiTags('Повідомлення')
// @UseGuards(AuthGuard)
@Controller('messages')
export class MessagesController {
    constructor(private messagesService:MessagesService){

    }

    // @Post()
    // createMessage(@Body() body){
    //     return this.messagesService.createMessage(body)
    // }

    @ApiOperation({summary:'Запит повідомлень за Id кімнати'})
    @ApiParam({name:'roomId',description:'Id кімнати',required:true,example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'})
    @ApiQuery({name:'page',description:'Номер сторінки повідомлень',required:true,example:'1'})
    @ApiQuery({name:'count',description:'К-сть повідомлень на сторінці',required:true,example:'100'})
    @ApiResponse({status:200,description:'Повідомлення успішно отримані',type:GetMessagesDto})
    @ApiResponse({status:400,type:ErrorDto})
    @Get(':roomId')
    getMessages(@Param() params,@Query() query){
        const payload:getMessagesByRoomIdType={
            roomId:params.roomId,
            page:Number(query.page),
            count:Number(query.count)
        }
        return this.messagesService.getMessagesByRoomId(payload)
    }

    @ApiOperation({summary:'Оновлення повідомлення за його Id '})
    @ApiParam({name:'messageId',description:'Id повідомлення яке треба оновити',required:true,example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'})
    @ApiBody({type:UpdateMessageDto,required:true,description:'Новий вміст повідомлення'})
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
    @ApiParam({name:'messageId',description:'Id повідомлення',required:true,example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'})
    @ApiQuery({name:'authorId',description:'Id автора повідомлення',required:true,example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'})
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
