module.exports = app => {
  const { INTEGER, DATE, STRING, TEXT, BOOLEAN } = app.Sequelize;

  return {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    event_name: {
      type: STRING(100),
      allowNull: false,
    },
    event_banners: STRING,
    event_describe: TEXT,
    event_details: STRING,
    start_register_time: {
      type: DATE,
      allowNull: false,
      comment: '开始报名时间',
    },
    end_register_time: {
      type: DATE,
      allowNull: false,
      comment: '结束报名时间',
    },
    start_time: {
      type: DATE,
      allowNull: false,
      comment: '赛事开始时间',
    },
    end_time: {
      type: DATE,
      allowNull: false,
      comment: '赛事结束时间',
    },
    most_person: {
      type: INTEGER,
      comment: '最多报名人数',
    },
    sponsor_id: {
      type: INTEGER,
      allowNull: false,
      comment: '主办方ID',
    },
    event_type: {
      type: INTEGER,
      allowNull: false,
    },
    team_most_person: {
      type: INTEGER,
      comment: '团队最多人数',
    },
    team_least_person: {
      type: INTEGER,
      comment: '团队最少人数',
    },
    team_most_count: {
      type: INTEGER,
      comment: '最多团队数量',
    },
    event_attachment: {
      type: STRING,
      comment: '赛事附件',
    },
    data_structure: {
      type: TEXT,
      comment: '报名信息的数据结构',
    },
    is_hidden: {
      type: BOOLEAN,
      comment: '是否隐藏赛事',
    },
  };
};
