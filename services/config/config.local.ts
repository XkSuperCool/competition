import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    sequelize: {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'ki-competition',
      username: 'root',
      password: 'root',
      define: {
        freezeTableName: true, // 强制表名称等于模型名称
      },
    },
  };
  return config;
};
