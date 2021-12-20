import {
  Column, DataType, Model, Scopes, Table
} from 'sequelize-typescript';
import { getUUID } from '../utils';

export enum TRANSACTIONS_TYPE {
  DEPOSIT = 'Deposit',
  WITHDRAW = 'Withdraw'
}

export interface IRawTransactionsData {
  data: string
  topics: string[]
}

export interface ITransactionReturnValues {
  [key: string]: string;
}

@Scopes(() => ({
  defaultScope: {
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  }
}))

@Table
export class Transactions extends Model<Transactions> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: () => getUUID()
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  type: TRANSACTIONS_TYPE;

  @Column({
    type: DataType.STRING
  })
  from: string;

  @Column({
    type: DataType.STRING
  })
  to: string;

  @Column({
    type: DataType.DECIMAL
  })
  amount: number;

  @Column({
    type: DataType.BOOLEAN
  })
  removed: boolean;

  @Column({
    type: DataType.STRING
  })
  hash: string;

  @Column({
    type: DataType.INTEGER
  })
  index: number;

  @Column({
    type: DataType.JSONB
  })
  returnValues: ITransactionReturnValues;

  @Column({
    type: DataType.STRING
  })
  signature: string;

  @Column({
    type: DataType.JSONB
  })
  rawData: IRawTransactionsData;
}
