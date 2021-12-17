import { EventData } from 'web3-eth-contract';
import { TRANSACTIONS_TYPE } from '../models/Transactions';

export class EventLogger {
  err: unknown
  data: EventData

  constructor(err, data) {
    this.err = err;
    this.data = data;
  }

  async withdrawEventHandler(data: EventData): Promise<void> {
    console.log('Withdraw EVENT');
    console.log('\t', data.event, data.blockNumber, data['id']);
    console.log(data);
  }

  async depositEventHandler(data: EventData): Promise<void> {
    console.log('Deposit EVENT');
    console.log('\t', data.event, data.blockNumber, data['id']);
    // console.log(data);
  }

  async errorEventHandler(err): Promise<void> {
    console.log('ERROR EVENT');
    console.log('\t', err);
  }

  async execute(): Promise<void> {
    if (this.err) {
      await this.errorEventHandler(this.data);
      return;
    }
    switch (this.data.event) {
      case TRANSACTIONS_TYPE.DEPOSIT:
        await this.depositEventHandler(this.data);
        break;

      case TRANSACTIONS_TYPE.WITHDRAW:
        await this.withdrawEventHandler(this.data);
        break;

      default:
        await this.errorEventHandler(this.data);
        break;
    }
  }
}
