module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, DATE } = app.Sequelize;
  return {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING(20),
      allowNull: false,
    },
    nickname: STRING(20),
    real_name: STRING(20),
    phone: INTEGER,
    address: STRING,
    is_sponsor: BOOLEAN,
    createdAt: DATE,
    updatedAt: DATE,
  };
};
