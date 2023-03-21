import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";

interface TokenCreateAttrs{
    id:string,
    user:string,
    refreshToken:string
}

@Table({modelName:'token'})
export class Token extends Model<Token,TokenCreateAttrs>{
    @ApiProperty({
        example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        description: 'Id Задається автоматично',
    })
    @Column({type:DataType.STRING,unique:true,primaryKey:true})
    id:string

    @ApiProperty({
        example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        description: 'Id користувача',
    })
    @Column({type:DataType.STRING,allowNull: false})
    @ForeignKey(() => User)
    userId:string

    @ApiProperty({
        example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        description: 'Refresh токен',
    })
    @Column({type:DataType.STRING,allowNull: false})
    refreshToken:string
}