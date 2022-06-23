import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateMessageDto{
    @ApiProperty({example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',description:'Id автора повідомлення'})
    @IsString({message:'Дане поле має бути рядком'})
    readonly authorId:string

    @ApiProperty({example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',description:'Id кімнати'})
    @IsString({message:'Дане поле має бути рядком'})
    readonly roomId:string    

    @ApiProperty({example:'message text',description:'Текст повідомлення'})
    @IsString({message:'Дане поле має бути рядком'})
    readonly message:string

    @ApiProperty({example:'2022-06-23T13:10:28.071Z',description:'Точна дата нодсилання повідомлення'})
    @IsString({message:'Дане поле має бути рядком'})
    readonly createdDate:string
}