import { ApiProperty } from "@nestjs/swagger"

export class GetMessagesDto{
    @ApiProperty({example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',description:'Id повідомлення'})
    readonly id:string

    @ApiProperty({example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',description:'Id автора повідомлення'})
    readonly authorId:string

    @ApiProperty({example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',description:'Id кімнати'})
    readonly roomId:string    

    @ApiProperty({example:'message text',description:'Текст повідомлення'})
    readonly message:string

    @ApiProperty({example:'2022-06-23T13:10:28.071Z',description:'Точна дата нодсилання повідомлення'})
    readonly createdDate:string

    @ApiProperty({example:'true',description:'Чи оновлювалось повідомлення'})
    readonly isUpdate:boolean
}
