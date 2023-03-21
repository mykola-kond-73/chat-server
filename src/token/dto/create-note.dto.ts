import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({
    example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    description: 'Id користувача',
  })
  @IsString({ message: 'Дане поле має бути рядком' })
  readonly userId: string;

  @ApiProperty({
    example: 'email_0@email.com',
    description: 'Refresh токен ',
  })
  @IsString({ message: 'Дане поле має бути рядком' })
  readonly refreshToken: string;
}
