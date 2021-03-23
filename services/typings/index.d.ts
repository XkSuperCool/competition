import 'egg';
import Sequelize from 'sequelize';

declare module 'egg' {

}

export interface Application {
  Sequelize: typeof Sequelize;
  model: any,
}
