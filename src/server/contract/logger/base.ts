import { EventData } from 'web3-eth-contract';
import { ITransactionInfo } from '../../models/Transactions';
import BigNumber from 'bignumber.js';

export abstract class EventLogger {
  error: unknown;
  readonly event: EventData;
  private readonly transactionInfo: ITransactionInfo

  constructor(err: unknown, event: EventData) {
    this.error = err;
    this.event = event;

    if (!err) {
      this.transactionInfo = this.parseEventData();
    }
  }

  protected parseEventData(): ITransactionInfo {
    return {
      from: this.event.returnValues['0'],
      to: this.event.returnValues['2'],
      amount: new BigNumber(this.event.returnValues['1']),
      removed: this.event['removed'],
      blockNumber: this.event.blockNumber,
      blockHash: this.event.blockHash,
      logIndex: this.event.logIndex,
      transactionIndex: this.event.transactionIndex,
      transactionHash: this.event.transactionHash,
      returnValues: this.event.returnValues,
      signature: this.event.signature,
      rawData: this.event.raw
    };
  }

  async errorHandler(): Promise<void> {
    console.log('ERROR EVENT');
    console.log('\t', this.error);
  }

  abstract execute(): Promise<void>

  getTransactionInfo(): ITransactionInfo {
    return this.transactionInfo;
  }
}
