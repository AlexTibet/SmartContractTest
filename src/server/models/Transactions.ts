import {
  Column, DataType, Model, Scopes, Table
} from 'sequelize-typescript';
import { getUUID } from '../utils';
import { BigNumber } from 'bignumber.js';

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

export interface ITransactionInfo {
  from: string
  to: string
  amount: BigNumber.Instance
  removed: boolean
  blockNumber: number
  blockHash: string
  logIndex: number
  transactionIndex: number
  returnValues: ITransactionReturnValues
  signature: string
  rawData: IRawTransactionsData
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
    type: DataType.STRING,
    allowNull: false
  })
  from: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  to: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false
  })
  amount: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  removed: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  blockNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  blockHash: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  logIndex: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  transactionIndex: number;

  @Column({
    type: DataType.JSONB
  })
  returnValues: ITransactionReturnValues;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  signature: string;

  @Column({
    type: DataType.JSONB
  })
  rawData: IRawTransactionsData;
}
