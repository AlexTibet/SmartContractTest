import { Column, DataType, Model, Scopes, Table, HasMany } from 'sequelize-typescript';
import { Wallets } from './Wallets';
import { getUUID } from '../utils';

@Scopes(() => ({
  defaultScope: {
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  }
}))

@Table
export class Users extends Model<Users> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: () => getUUID()
  })
  id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  address: string

  @HasMany(() => Wallets)
  wallets: Wallets;
}
