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
      references: {
        model: 'eventType',
        key: 'id',
      },
    },
    team_id: {
      type: INTEGER,
      references: {
        model: 'team',
        key: 'id',
      },
    },
    createdAt: DATE,
    updatedAt: DATE,
  };
};
