import { ApiProperty } from '@nestjs/swagger';

export class ResponceGetRoomsDto {
  @ApiProperty({
    example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    description: 'Id кімнати який задається автоматично',
  })
  readonly id: string;

  @ApiProperty({
    example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    description: 'Id першого клієнта кімнати',
  })
  readonly clientId_1: string;

  @ApiProperty({
    example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    description: 'Id другого клієнта кімнати',
  })
  readonly clientId_2: string;
}
