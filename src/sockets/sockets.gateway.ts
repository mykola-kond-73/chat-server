import { UseGuards } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthGuard } from 'src/auth/auth.guard';

// @UseGuards(AuthGuard)
@WebSocketGateway()
export class SocketsGateway implements OnGatewayInit {
  afterInit(server: any) {

  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket
  ): string {
    return data
  }
}
