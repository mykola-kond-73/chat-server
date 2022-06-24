import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Room } from "src/rooms/rooms.model";

interface MessageCreateAttrs{
    id:string
    authorId:string
    roomId:string    
    message:string
    createdDate:string
    isUpdate:boolean
}

@Table({modelName:'messages'})
export class Message extends Model<Message,MessageCreateAttrs>{
    @ApiProperty({example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',description:'Id повідомлення. Задається автоматично'})
    @Column({type:DataType.STRING,unique:true,primaryKey:true})
    id:string

    @ApiProperty({example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',description:'Id автора повідомлення'})
    @Column({type:DataType.STRING,allowNull:false})
    authorId:string

    @ApiProperty({example:'message text',description:'Текст повідомлення'})
    @Column({type:DataType.STRING,allowNull:false})
    message:string

    @ApiProperty({example:'2022-06-23T13:10:28.071Z',description:'Точна дата нодсилання повідомлення'})
    @Column({type:DataType.DATE,allowNull:false})
    createdDate:string

    @ApiProperty({example:'true',description:'Чи оновлювалось повідомлення'})
    @Column({type:DataType.BOOLEAN,defaultValue:false})
    isUpdate:boolean

    @ApiProperty({example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',description:'Id кімнати'})
    @Column({type:DataType.STRING,allowNull:false})
    roomId:string
}