import { Application } from 'egg';
import UserEventSchema from '../schema/userEvent';

export interface UserEventItem {
  user_id: string;
  event_id: string;
  event_type: 0 | 1 | 2;
}

const UserEventModel = (app: Application) => {
  const UserEvent = app.model.define('userEvent', UserEventSchema);
  return class extends UserEvent {

    /**
     * 分页，获取用户报名的赛事
     * @param userId 用户 id
     * @param offset 偏移值
     * @param limit 获取条数
     */
    static async queryUserEventById(userId, offset: number, limit: number) {
      const { count, rows } = await UserEvent.findAndCountAll({
        offset,
        limit,
        where: {
          user_id: userId,
        },
      });
      return {
        total: count,
        list: rows,
      };
    }

    /**
     * 保存赛事和用户关系，储存用户报名赛事的信息
     * @param data 用户报名赛事的信息
     */
    static async save(data: UserEventItem) {
      return await UserEvent.create(data);
    }
  };
};

export default UserEventModel;
