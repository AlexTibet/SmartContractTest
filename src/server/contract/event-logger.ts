import { EventData } from 'web3-eth-contract';

abstract class EventLogger {
  error: unknown;
  event: EventData;

  constructor(err: unknown, event: EventData) {
    this.error = err;
    this.event = event;
  }

  async errorHandler(): Promise<void> {
    console.log('ERROR EVENT');
    console.log('\t', this.error);
  }

  abstract execute(err, data: EventData): Promise<void>
}

export class DepositLogger extends EventLogger {
  async execute(): Promise<void> {
    if (this.error) {
      return await this.errorHandler();
    }
    console.log('DEPOSIT EVENT');
    console.log('\t', this.event);
  }
}

export class WithdrawLogger extends EventLogger {
  async execute(): Promise<void> {
    if (this.error) {
      return await this.errorHandler();
    }
    console.log('WITHDRAW EVENT');
    console.log('\t', this.event);
  }
}
