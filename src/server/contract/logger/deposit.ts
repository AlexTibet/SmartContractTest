import { EventLogger } from './base';

export class DepositLogger extends EventLogger {
  async execute(): Promise<void> {
    if (this.error) {
      return await this.errorHandler();
    }
    console.log('DEPOSIT EVENT');
    console.log('\t', this.event);
  }
}
