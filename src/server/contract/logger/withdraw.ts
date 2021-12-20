import { EventLogger } from './base';

export class WithdrawLogger extends EventLogger {
  async execute(): Promise<void> {
    if (this.error) {
      return await this.errorHandler();
    }
    console.log('WITHDRAW EVENT');
    console.log('\t', this.event);
  }
}
