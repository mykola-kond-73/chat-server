import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDto {
  @ApiProperty({
    example: 'message text',
    description: 'Новий вміст повідомлення',
  })
  readonly newMessage: string;
}
