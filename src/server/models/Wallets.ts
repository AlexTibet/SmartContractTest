import { Column, DataType, ForeignKey, Model, Table, BelongsTo } from 'sequelize-typescript';
import { Users } from './Users';
import { getUUID } from '../utils';

@Table
export class Wallets extends Model<Wallets> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: () => getUUID()
  })
  id: string;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.UUID
  })
  userId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  token: string;

  @Column({
    type: DataType.DECIMAL,
    defaultValue: 0
  })
  balance: number;

  @Column({
    type: DataType.DECIMAL,
    defaultValue: 0
  })
  lockedBalance: number;

  @BelongsTo(() => Users)
  user: Users;
}
