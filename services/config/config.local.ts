import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    sequelize: {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'ki-competition',
      username: 'root',
      password: 'lk19981123',
    },
  };
  return config;
};
