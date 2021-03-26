import { Application } from 'egg';
import UserEventSchema from '../schema/userEvent';
import UserSchema from '../schema/User';

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
  event_type: 0 | 1 | 2;
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

  return class extends CompetitionEvent {
    /**
     * 获取赛事分页数据
     * @param offset 偏移下标
     * @param limit 获取数量
     */
    static async query(offset: number, limit: number) {
      const { count, rows } = await CompetitionEvent.findAndCountAll({
        offset,
        limit,
        where: {
          is_hidden: false,
          // todo: 需要过滤已经结束的赛事
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