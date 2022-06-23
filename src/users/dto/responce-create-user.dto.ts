import { ApiProperty } from "@nestjs/swagger";

export class ResponceCreateUserDto{
    @ApiProperty({example:'00a6fa25-df29-4701-9077-557932591766',description:'Ідентифікатор новоствореного користувача'})
    readonly userId:string
}