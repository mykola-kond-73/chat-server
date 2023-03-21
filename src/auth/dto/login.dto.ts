import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        example: 'user_1@emal.com',
        description: 'Логін/електронна адреса користувача',
        type: String,
    })
    @IsString({ message: 'Дане поле має бути рядком' })
    @IsEmail({}, { message: 'Некоретний e-mail' })
    readonly email: string;

    @ApiProperty({
        example: 'user_1-password',
        description: 'Пароль користувача',
        minLength: 8,
        maxLength: 100,
    })
    @IsString({ message: 'Дане поле має бути рядком' })
    @Length(8, 100, {
        message: 'Пароль має бути не менше 8 та не більше 100 символів',
    })
    readonly password: string;
}
