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
  @Column({ type: DataType.UUID })
  userId: string;

  @Column({
    type: DataType.STRING
  })
  token: string;

  @Column({
    type: DataType.STRING
  })
  address: string;

  @Column({
    type: DataType.DECIMAL
  })
  balance: number;

  @BelongsTo(() => Users)
  user: Users;
}
