import { Sequelize } from 'sequelize-typescript';
import config from '../config/config';
import { Example } from './Example';

const sequelize = new Sequelize(config.dbLink, {
  dialect: 'postgres',
  models: [Example],
  logging: false
});

sequelize
    .authenticate()
    .then()
    .catch((err) => console.log(err));

export default sequelize;
