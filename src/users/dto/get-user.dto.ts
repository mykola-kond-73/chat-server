import { ApiProperty } from "@nestjs/swagger"

export class GetUserDto{
    @ApiProperty({example:'00a6fa25-df29-4701-9077-557932591766',description:'Ідентифікатор користувача'})
    readonly id:string

    @ApiProperty({example:'user_1',description:'Ім`я користувача'})
    readonly name:string
}