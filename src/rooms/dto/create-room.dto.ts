import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateRoomDto{
    @ApiProperty({example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',description:'Id першого клієнта кімнати'})
    @IsString({message:'Дане поле має бути рядком'})
    readonly clientId_1:string
    
    @ApiProperty({example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',description:'Id другого клієнта кімнати'})
    @IsString({message:'Дане поле має бути рядком'})
    readonly clientId_2:string
}