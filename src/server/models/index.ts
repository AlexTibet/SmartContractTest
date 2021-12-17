import { Sequelize } from 'sequelize-typescript';
import config from '../config/config';
import { Transactions } from './Transactions';
import { Users } from './Users';

const sequelize = new Sequelize(config.dbLink, {
  dialect: 'postgres',
  models: [Transactions, Users],
  logging: false
});

sequelize
    .authenticate()
    .then()
    .catch((err) => console.log(err));

export default sequelize;
