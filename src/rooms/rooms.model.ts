import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Message } from "src/messages/messages.model";

interface RoomCreateDto{
    id:string,
    clientId_1:string,
    clientId_2:string
}

@Table({tableName:'rooms'})
export class Room extends Model<Room,RoomCreateDto>{

    @ApiProperty({example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',description:'Id кімнати який задається автоматично'})
    @Column({type:DataType.STRING,unique:true,primaryKey:true})
    id:string

    @ApiProperty({example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',description:'Id першого клієнта кімнати'})
    @Column({type:DataType.STRING,allowNull:false})
    clientId_1:string

    @ApiProperty({example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',description:'Id другого клієнта кімнати'})
    @Column({type:DataType.STRING,allowNull:false})
    clientId_2:string

    @ApiProperty({example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',description:'Id першого клієнта кімнати'})
    @HasMany(()=>Message)
    messages:Message[]
}