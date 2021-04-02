import { Application } from 'egg';

export interface UserEventInstance {
  user_id: number;
  event_id: number;
  event_type: number;
  team_id?: number;
}

const UserEventModel = (app: Application) => {
  const UserEventSchema = require('../schema/userEvent')(app);
  const EventTypeSchema = require('../schema/eventType')(app);
  const UserEvent = app.model.define('userEvent', UserEventSchema);
  const EventType = app.model.define('eventType', EventTypeSchema);

  return class extends UserEvent {
    static associate() {
      app.model.User.belongsToMany(app.model.CompetitionEvent, { through: UserEvent, foreignKey: 'event_id' });
      app.model.CompetitionEvent.belongsToMany(app.model.User, { through: UserEvent, foreignKey: 'user_id' });
      EventType.hasMany(UserEvent, { foreignKey: 'event_type' });
    }

    /**
     * 分页，获取用户报名的赛事
     * @param userID 用户 id
     * @param offset 偏移值
     * @param limit 获取条数
     * @param keywords 搜索关键字
     */
    static async queryUserEventById(userID: number, offset: number, limit: number, keywords?: string) {
      const where = {
        user_id: userID,
      };
      if (keywords) {
        where[app.Sequelize.Op.like] = `%${keywords}%`;
      }
      const { count, rows } = await UserEvent.findAndCountAll({
        offset,
        limit,
        include: [
          {
            association: app.model.UserEvent.belongsTo(app.model.CompetitionEvent, {
              foreignKey: 'event_id',
            }),
            attributes: {
              exclude: [
                'event_details',
                'most_person',
                'team_most_person',
                'team_least_person',
                'team_most_count',
                'event_attachment',
                'data_structure',
                'createdAt',
                'updatedAt',
              ],
            },
          },
        ],
        where: { ...where },
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
          ],
        },
      });
      return {
        total: count,
        list: rows,
      };
    }

    /**
     * 获取一条数据
     * @param userID 用户 id
     * @param eventType 赛事类型
     * @param eventID 赛事 id
     */
    static async getOneData(userID: number, eventType: number, eventID: number) {
      return await UserEvent.findOne({
        where: {
          user_id: userID,
          event_id: eventID,
          event_type: eventType,
        },
      });
    }

    /**
     * 删除一条数据
     * @param userID 用户 id
     * @param eventType 赛事类型
     * @param eventID 赛事 id
     */
    static async deleteOneData(userID: number, eventType: number, eventID: number) {
      return await UserEvent.destroy({
        where: {
          user_id: userID,
          event_id: eventID,
          event_type: eventType,
        },
      });
    }

    /**
     * 删除所有 teamId 相等的数据
     * @param eventID 赛事 id
     * @param eventType 赛事类型
     * @param teamID 团队 id
     */
    static async deleteTeamData(eventID: number, eventType: number, teamID: number) {
      return await UserEvent.destroy({
        where: {
          event_id: eventID,
          event_type: eventType,
          team_id: teamID,
        },
      });
    }

    /**
     * 获取用户报名的赛事，根据 eventID 筛选
     * @param userID 用户 id
     * @param eventID 赛事 id
     */
    static async queryUserEventByEventId(userID: number, eventID: number) {
      return await UserEvent.findAll<any>({
        where: {
          user_id: userID,
          event_id: eventID,
        },
      });
    }

    /**
     * 保存赛事和用户关系，储存用户报名赛事的信息
     * @param data 用户报名赛事的信息
     */
    static async save(data: UserEventInstance) {
      return await UserEvent.create(data);
    }
  };
};

export default UserEventModel;
