import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Message } from "../messages/messages.model";
import { User } from "../users/users.model";

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

    //* Просто Id
    @ForeignKey(()=>User)                   
    @ApiProperty({example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',description:'Id першого клієнта кімнати'})
    @Column({type:DataType.STRING,allowNull:false})
    clientId_1:string

    //* об'єкт користувача
    @BelongsTo(()=>User,{as:'user_1',foreignKey:'clientId_1'})          //? псевдонім через те що двічі посилання йде на одну модель                  
    user_1:User

    @ForeignKey(()=>User)
    @ApiProperty({example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',description:'Id другого клієнта кімнати'})
    @Column({type:DataType.STRING,allowNull:false})
    clientId_2:string

    @BelongsTo(()=>User,{as:'user_2',foreignKey:'clientId_2'})
    user_2:User

    @ApiProperty({example:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',description:'Id першого клієнта кімнати'})
    @HasMany(()=>Message)
    messages:Message[] 
}