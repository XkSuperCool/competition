module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;
  return {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    event_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'competitionEvent',
        key: 'id',
      },
    },
    event_type: {
      type: INTEGER,
      allowNull: false,
    },
    createdAt: DATE,
    updatedAt: DATE,
  };
};
