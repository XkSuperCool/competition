import { Service } from 'egg';
import { UserEventInstance } from '../model/UserEvent';

export default class UserEventClass extends Service {
  create(data: UserEventInstance) {
    return this.ctx.model.UserEvent.save(data);
  }

  findUserEvent(id: number, offset = 1, limit = 10) {
    const { ctx } = this;
    return ctx.model.UserEvent.queryUserEventById(id, offset, limit);
  }

  async delete(userID: number, eventType: number, eventID: number) {
    return await this.ctx.model.UserEvent.deleteOneData(userID, eventType, eventID);
  }

  async checkedUserIsSignUpEvent(userID: number, eventID: number) {
    const { ctx } = this;
    const res = await ctx.model.UserEvent.queryUserEventByEventId(userID, eventID);
    if (res.length === 0) {
      return 'none';
    }
    if (res.length === 1) {
      switch (res[0].event_type) {
        case 1:
          return 'alone';
        case 2:
          return 'team';
        default: break;
      }
    }
    return 'all';
  }
}
