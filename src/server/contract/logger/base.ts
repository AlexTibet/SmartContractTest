import { EventData } from 'web3-eth-contract';

export abstract class EventLogger {
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
