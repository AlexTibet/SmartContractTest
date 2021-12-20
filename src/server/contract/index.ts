import { EventData } from 'web3-eth-contract';
import { TRANSACTIONS_TYPE } from '../models/Transactions';
import { ContractStorage } from './ContractStorage';
import { loggers } from './logger';

const { DepositLogger, WithdrawLogger } = loggers;

const depositEventListener = async (err, event: EventData): Promise<void> => {
  await new DepositLogger(err, event).execute();
};
const withdrawEventListener = async (err, event: EventData): Promise<void> => {
  await new WithdrawLogger(err, event).execute();
};

const getLastBlock = async (): Promise<number> => {
  // TODO:
  return 9824039;
};

export const init = async (): Promise<void> => {
  const options = {
    fromBlock: await getLastBlock()
  };

  const contractStorage = ContractStorage.getInstance();
  const stockExchangeContract = contractStorage.getStockExchangeContract();

  await stockExchangeContract.events[TRANSACTIONS_TYPE.DEPOSIT](options, depositEventListener);
  await stockExchangeContract.events[TRANSACTIONS_TYPE.WITHDRAW](options, withdrawEventListener);
};

