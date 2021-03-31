import { Application } from 'egg';
import UserEventSchema from '../schema/userEvent';
import UserSchema from '../schema/user';
import EventTypeSchema from '../schema/eventType';

export interface CompetitionEventItem {
  event_name: string;
  event_banners?: string;
  event_describe?: string;
  event_details?: string;
  start_register_time: string,
  end_register_time: string;
  start_time: string;
  end_time: string;
  most_person?: number;
  sponsor_id: number;
  event_type: number;
  team_most_person?: number;
  team_least_person?: number;
  team_most_count?: number;
  event_attachment?: string;
  data_structure?: string;
  is_hidden?: boolean,
  created_at?: string,
  updated_at?: string,
}

const CompetitionEventModel = (app: Application) => {
  const CompetitionEventSchema = require('../schema/competitionEvent')(app);
  const CompetitionEvent = app.model.define('competitionEvent', CompetitionEventSchema);

  // 多对多关系
  const UserEvent = app.model.define('userEvent', UserEventSchema);
  const User = app.model.define('user', UserSchema);
  CompetitionEvent.belongsToMany(User, { through: UserEvent, foreignKey: 'event_id' });
  // 一对多关系
  const EventType = app.model.define('user', EventTypeSchema);
  EventType.hasMany(CompetitionEvent, { foreignKey: 'event_type' });

  return class extends CompetitionEvent {
    /**
     * 获取赛事分页数据
     * @param offset 偏移下标
     * @param limit 获取数量
     * @param keywords 关键字
     * @param eventType 赛事类型
     */
    static async query(offset: number, limit: number, keywords?: string, eventType?: number) {
      const where: {[keys: string]: any} = {
        is_hidden: false,
        end_register_time: {
          [app.Sequelize.Op.gte]: new Date(),
        },
        start_register_time: {
          [app.Sequelize.Op.lte]: new Date(),
        },
      };
      if (keywords) {
        where.event_name = {
          [app.Sequelize.Op.like]: `%${keywords}%`,
        };
      }
      if (eventType) {
        where.event_type = eventType;
      }
      const { count, rows } = await CompetitionEvent.findAndCountAll({
        offset,
        limit,
        where: {
          [app.Sequelize.Op.and]: {
            ...where,
          },
        },
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
        order: [
          [ 'id', 'desc' ],
        ],
      });
      return {
        total: count,
        list: rows,
      };
    }

    /**
     * 根据 id 获取数据
     * @param id 赛事 id
     */
    static async getOneDataById(id: number) {
      return await CompetitionEvent.findOne({
        where: {
          id,
        },
      });
    }

    /**
     * 保存一条数据
     * @param data 赛事数据
     */
    static async save(data: CompetitionEventItem) {
      return await CompetitionEvent.create(data);
    }
  };
};

export default CompetitionEventModel;
