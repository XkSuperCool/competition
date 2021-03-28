module.exports = app => {
  const { INTEGER, DATE, STRING } = app.Sequelize;
  return {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING,
    createdAt: DATE,
    updatedAt: DATE,
  };
};
