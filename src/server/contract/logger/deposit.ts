import { EventLogger } from './base';
import { Users } from '../../models/Users';
import { Transactions, TRANSACTIONS_TYPE } from '../../models/Transactions';
import sequelize from '../../models';
import { Wallets } from '../../models/Wallets';

export class DepositLogger extends EventLogger {
  async execute(): Promise<void> {
    if (this.error) {
      return await this.errorHandler();
    }

    console.log('DEPOSIT EVENT');
    console.log('\t', this.event);

    const transactionInfo = this.getTransactionInfo();
    console.log(transactionInfo);

    const t = await sequelize.transaction();
    try {
      const [transaction, trxNotFound] = await Transactions.findOrCreate({
        where: {
          transactionHash: transactionInfo.transactionHash
        },
        defaults: {
          ...transactionInfo,
          type: TRANSACTIONS_TYPE.DEPOSIT
        },
        transaction: t
      });

      if (!trxNotFound) {
        console.log('FIND', transaction.transactionHash);
        return;
      }

      const [user] = await Users.findOrCreate({
        where: {
          address: transactionInfo.from
        },
        defaults: {
          address: transactionInfo.from
        },
        transaction: t
      });

      const [wallet] = await Wallets.findOrCreate({
        where: {
          userId: user.id,
          token: transactionInfo.to
        },
        defaults: {
          userId: user.id,
          token: transactionInfo.to
        },
        transaction: t
      });

      await wallet.increment(
          'balance',
          {
            by: transactionInfo.amount.toNumber(),
            transaction: t
          });

      await t.commit();
    } catch (err) {
      console.log(err);
      await t.rollback();
    }
  }
}
