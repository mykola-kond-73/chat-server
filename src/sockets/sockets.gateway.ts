import { Injectable} from '@nestjs/common';
import {ConnectedSocket,MessageBody,OnGatewayConnection,OnGatewayDisconnect,OnGatewayInit,SubscribeMessage,WebSocketGateway,WebSocketServer,} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TokenService } from '../token/token.service';
import { MessagesService } from '../messages/messages.service';
import { connType, createMessageType, deleteMessageType, updateMessageType } from '../utils/types/sockets';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:8080','http://192.168.0.103:8080'],
    methods: ['GET', 'POST'],
    credentials: true,
    // allowEIO3: true
  },
})
export class SocketsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private messageService: MessagesService,
    private tokenService:TokenService
  ) { }

  @WebSocketServer()
  wss: Server; //? щоб можна було надсилати відповідь всім користувачам

  @SubscribeMessage('conn')
  handlerConn(@MessageBody() data: connType, @ConnectedSocket() client: Socket) {
    console.log();
    console.log('conn');

    client.join(data.roomId);
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: createMessageType,@ConnectedSocket() client: Socket) {
    try{
    // this.wss.emit('emit',data*)          //? щоб можна було надсилати відповідь всім користувачам
 
    console.log()
    console.log('message')

    this.tokenService.validateAccessTokenForSokets(data.token)
    delete data.token

    const message = await this.messageService.createMessage(data);
    this.wss.in(data.roomId).emit('message', message)
    }catch(error){
      client.emit('createMessageError',error,data)
    }
  }

  @SubscribeMessage('delete')
  handleDelete(@MessageBody() data: deleteMessageType, @ConnectedSocket() client: Socket) {
    console.log();
    console.log('delete');

    this.wss.in(data.roomId).emit('deleteFromServer', data.messageId)
  }

  @SubscribeMessage('update')
  handleUpdate(@MessageBody() data: updateMessageType, @ConnectedSocket() client: Socket) {
    console.log()
    console.log('update')

    this.wss.in(data.roomId).emit('updateFromServer', data.message);
  }

  afterInit(server: Server) {
    console.log();
    console.log('init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log();
    console.log('connection');
  }

  handleDisconnect(client: Socket) {
    console.log();
    console.log('disconnect');
  }
}