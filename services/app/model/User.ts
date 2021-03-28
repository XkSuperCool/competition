import { Application } from 'egg';
import UserEventSchema from '../schema/UserEvent';

export interface UserInstance {
  username: string;
  password: string;
  nickname?: string;
  real_name?: string;
  phone?: number;
  address?: string;
  is_sponsor?: boolean;
  wx_openid?: string;
}

const UserModel = (app: Application) => {
  const UserSchema = require('../schema/user')(app);
  const User = app.model.define('user', UserSchema);

  return class extends User {
    static associate() {
      const UserEvent = app.model.define('user', UserEventSchema);
      User.belongsToMany(app.model.CompetitionEvent, { through: UserEvent, foreignKey: 'user_id' });
    }

    /**
     * 获取一条数据，根据微信的 openid
     * @param openId 微信 openid
     */
    static async findOnDataByWXOpenID(openId: string) {
      return await User.findOne<any>({
        where: {
          wx_openid: openId,
        },
      });
    }

    // 保存数据
    static async save(data: UserInstance) {
      return await User.create<any>(data);
    }
  };
};

export default UserModel;
