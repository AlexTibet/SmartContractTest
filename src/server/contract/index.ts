import { EventData } from 'web3-eth-contract';
import { TRANSACTIONS_TYPE, Transactions } from '../models/Transactions';
import { ContractStorage } from './ContractStorage';
import { loggers } from './logger';

const { DepositLogger, WithdrawLogger } = loggers;

const depositEventListener = async (err, event: EventData): Promise<void> => {
  await new DepositLogger(err, event).execute();
};
const withdrawEventListener = async (err, event: EventData): Promise<void> => {
  await new WithdrawLogger(err, event).execute();
};

const getLastBlock = async (): Promise<number | undefined> => {
  const lastBlocks = await Transactions.findAll({
    attributes: ['blockNumber'],
    raw: true,
    limit: 7, // number of shift blocks
    order: [['blockNumber', 'DESC']]
  });
  return lastBlocks.pop()?.blockNumber;
};

export const init = async (): Promise<void> => {
  const options = {
    fromBlock: await getLastBlock() || 'latest'
  };

  const contractStorage = ContractStorage.getInstance();
  const stockExchangeContract = contractStorage.getStockExchangeContract();

  await stockExchangeContract.events[TRANSACTIONS_TYPE.DEPOSIT](options, depositEventListener);
  await stockExchangeContract.events[TRANSACTIONS_TYPE.WITHDRAW](options, withdrawEventListener);
  console.log(`[x] Contract events listen from ${ options.fromBlock } block`);
};

