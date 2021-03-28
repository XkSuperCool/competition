module.exports = app => {
  const { INTEGER, DATE, STRING, TEXT, BOOLEAN, FLOAT } = app.Sequelize;

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
    cost: {
      type: INTEGER,
      comment: '个人报名费用',
      defaultValue: 0,
    },
    sponsor_id: {
      type: INTEGER,
      allowNull: false,
      comment: '主办方ID',
    },
    event_type: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'eventType',
        key: 'id',
      },
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
    team_cost: {
      type: INTEGER,
      comment: '团队报名费用',
      defaultValue: 0,
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
    province: {
      type: STRING,
      allowNull: false,
      comment: '赛事举办省份',
    },
    city: {
      type: STRING,
      allowNull: false,
      comment: '赛事举办城市',
    },
    district: {
      type: STRING,
      allowNull: false,
      comment: '赛事举办区县',
    },
    detailed_location: {
      type: STRING,
      allowNull: false,
      comment: '赛事举办详细位置',
    },
    longitude: {
      type: FLOAT,
      comment: '经度',
    },
    latitude: {
      type: FLOAT,
      comment: '维度',
    },
    createdAt: DATE,
    updatedAt: DATE,
  };
};
