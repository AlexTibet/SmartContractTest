import { EventLogger } from './base';
import sequelize from '../../models';
import { TRANSACTIONS_TYPE } from '../../models/Transactions';
import { Users } from '../../models/Users';
import { Wallets } from '../../models/Wallets';

export class WithdrawLogger extends EventLogger {
  async execute(): Promise<void> {
    if (this.error) {
      return await this.errorHandler();
    }

    const t = await sequelize.transaction();
    try {
      const trxNotFound = await this.saveOrCreateTrx(TRANSACTIONS_TYPE.WITHDRAW, t);

      if (!trxNotFound) {
        // repeated trx
        return;
      }

      const transactionInfo = this.getTransactionInfo();

      const user = await Users.findOne({
        where: {
          address: transactionInfo.from
        },
        include: [{
          model: Wallets,
          as: 'wallets',
          where: {
            token: transactionInfo.to
          }
        }]
      });

      const [wallet] = user.wallets as unknown as Wallets[];
      await wallet.decrement(
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
