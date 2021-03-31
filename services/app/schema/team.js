module.exports = app => {
  const { INTEGER, DATE, STRING } = app.Sequelize;
  return {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    slogan: STRING,
    logo: STRING,
    business_card: {
      type: STRING,
      allowNull: false,
    },
    leader: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    createdAt: DATE,
    updatedAt: DATE,
  };
};
