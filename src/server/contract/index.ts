import { EventData } from 'web3-eth-contract';
import { EventLogger } from './event-logger';
import { contractWSS } from './wss';

const eventListener = async (err, event: EventData): Promise<void> => {
  const logger = new EventLogger(err, event);
  await logger.execute();
};

const getLastBlock = async (): Promise<number> => {
  // TODO:
  return 9824039;
};

const test = async (data): Promise<void> => {
  console.log(data);
};

export const init = async (): Promise<void> => {
  const options = { fromBlock: await getLastBlock() };
  const tokenList = await contractWSS.methods['getListTokens']().call();
  console.log(tokenList);
  await contractWSS.events.allEvents(options, eventListener);
};

