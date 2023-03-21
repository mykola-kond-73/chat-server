import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './messages.model';
import { v4 as uuidv4 } from 'uuid';
import { deleteMessageById, getMessagesByRoomIdType, updateMessageByIdType } from '../utils/types/messages';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message) private messageRepository: typeof Message,
  ) { }

  async createMessage(dto: CreateMessageDto) {
    const newDto = {
      ...dto,
      id: uuidv4(),
    };

    const message = await this.messageRepository.create(newDto);

    if (!message) throw new HttpException('Помилка при створенні повідомлення', HttpStatus.BAD_REQUEST)
    return message;
  }

  async getMessagesByRoomId({ roomId, page, count }: getMessagesByRoomIdType) {
    const messages = await this.messageRepository.findAll({
      where: { roomId },
      offset: (page - 1) * count,
      limit: count,
      order: ['createdDate'],
      attributes: ['id', 'authorId', 'roomId', 'message', 'createdDate', 'isUpdate',],
      include: { all: true }
    })

    // if (messages.length == 0) throw new HttpException('Повідомлення для такої кімнати не знайдені', HttpStatus.BAD_REQUEST)
    return messages;
  }

  async updateMessageById(payload: updateMessageByIdType) {
    const message = await this.messageRepository.update(
      {
        isUpdate: true,
        message: payload.newMessage,
      },
      { where: { id: payload.messageId } },
    )

    if (message[0] != 1) throw new HttpException('Невдалося оновити повідомлення', HttpStatus.BAD_REQUEST)
    return await this.messageRepository.findOne({
      where: { id: payload.messageId },
    })
  }

  async deleteMessageById(payload: deleteMessageById) {
    const message = await this.messageRepository.destroy({ where: { authorId: payload.authorId, id: payload.messageId } })

    if (!message) throw new HttpException('Повідомлення не знайдено', HttpStatus.BAD_REQUEST)
    return true
  }
}
