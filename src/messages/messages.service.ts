import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './messages.model';
import { v4 as uuidv4 } from 'uuid'
import { deleteMessageById, getMessagesByRoomIdType, updateMessageByIdType } from 'src/utils/types/messages';
import { Op } from 'sequelize';


@Injectable()
export class MessagesService {
    constructor(@InjectModel(Message) private messageRepository: typeof Message) {

    }

    async createMessage(dto: CreateMessageDto) {
        try {
            const newDto = {
                ...dto,
                id: uuidv4()
            }

            const message = await this.messageRepository.create(newDto)
            return { messageId: message.id }
        } catch (error) {
            throw new HttpException('Помилка при створенні повідомлення', HttpStatus.BAD_REQUEST)
        }
    }

    async getMessagesByRoomId({ roomId, page, count }: getMessagesByRoomIdType) {
        try {

            const messages = await this.messageRepository.findAll({ 
                where: { roomId }, 
                offset: (page - 1) * count, 
                limit: count,
                attributes: ['id','authorId','roomId','message','createdDate','isUpdate'] 
            })
            
            if (messages.length != 0) return messages
            else throw new HttpException('', HttpStatus.BAD_REQUEST)
        } catch (error) {
            throw new HttpException('Повідомлення для такої кімнати не знайдені', HttpStatus.BAD_REQUEST)
        }
    }
    //!================================================================================================================================================
    async updateMessageById(payload: updateMessageByIdType) {
        try {

            const message = await this.messageRepository.update(
                {
                    isUpdate: true,
                    message: payload.newMessage
                },
                { where: { id: payload.messageId } })
            if (message) return message
            else throw new HttpException('', HttpStatus.BAD_REQUEST)
        } catch (error) {
            throw new HttpException('Невдалося оновити повідомлення', HttpStatus.BAD_REQUEST)
        }
    }
    //!================================================================================================================================================
    async deleteMessageById(payload:deleteMessageById){
        try{
            const message=await this.messageRepository.destroy({where:{authorId:payload.authorId,id:payload.messageId}})
            if(message) return 
            else throw new HttpException('', HttpStatus.BAD_REQUEST)
        }catch(error){
            throw new HttpException('Повідомлення не знайдено', HttpStatus.BAD_REQUEST)
        }
    }
}
