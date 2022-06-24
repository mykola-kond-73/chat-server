import { ApiProperty } from "@nestjs/swagger";

export class ErrorDto{
    @ApiProperty({example:'Error text',description:'Опис помилки'})
    readonly message:string
}