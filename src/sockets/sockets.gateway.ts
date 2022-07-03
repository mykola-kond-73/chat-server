import { UseGuards } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthGuard } from 'src/auth/auth.guard';

// @UseGuards(AuthGuard)
@WebSocketGateway()
export class SocketsGateway implements OnGatewayInit,OnGatewayConnection,OnGatewayDisconnect {

  @WebSocketServer() wss:Server             //? щоб можна було надсилати відповідь всім користувачам
  
  afterInit(server: Server) {
    console.log()
    console.log('init')
    console.log(server)
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log()
    console.log('connection')
    console.log(client)
    console.log(args)
    
  }

  handleDisconnect(client: Socket) {
    console.log()
    console.log('disconnect')
    console.log(client)
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket): string {

    // this.wss.emit('emit',data*)          //? щоб можна було надсилати відповідь всім користувачам

    console.log()
    console.log('message')
    console.log(data)
    console.log(client)

    return data
  }
}
