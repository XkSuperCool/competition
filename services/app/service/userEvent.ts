import { Service } from 'egg';
import { UserEventItem } from '../model/UserEvent';

export default class UserEventClass extends Service {
  create(data: UserEventItem) {
    return this.ctx.model.UserEvent.save(data);
  }

  findUserEvent(id: number, offset = 1, limit = 10) {
    const { ctx } = this;
    return ctx.model.UserEvent.queryUserEventById(id, offset, limit);
  }
}
