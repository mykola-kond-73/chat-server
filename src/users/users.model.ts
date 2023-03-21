import { BelongsToMany, ForeignKey } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Room } from '../rooms/rooms.model';

interface UserCreateAttrs {
  id: string;
  email: string;
  name: string;
  password: string;
}

@Table({ modelName: 'users' })
export class User extends Model<User, UserCreateAttrs> {
  @ApiProperty({
    example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    description: 'Id користувача який задається автоматично',
  })
  @Column({ type: DataType.STRING, unique: true, primaryKey: true })
  id: string;

  @ApiProperty({
    example: 'user_1@emal.com',
    description: 'Логін/електронна адреса користувача',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({
    example: 'user_1-password',
    description: 'Пароль користувача',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'user_1', description: 'Ім`я користувача' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => Room)
  rooms: Room[];
}
