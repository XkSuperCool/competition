import { Service } from 'egg';
import { UserEventInstance } from '../model/UserEvent';

export default class UserEventClass extends Service {
  create(data: UserEventInstance) {
    if (+data.event_type === 2 && !data.team_id) {
      return this.ctx.throw('团队赛报名，缺少团队 id ！');
    }
    return this.ctx.model.UserEvent.save(data);
  }

  findUserEvent(id: number, offset = 1, limit = 10) {
    const { ctx } = this;
    return ctx.model.UserEvent.queryUserEventById(id, offset, limit);
  }

  async delete(userID: number, eventType: number, eventID: number, teamId?: number) {
    const { ctx } = this;
    // 如果时团队赛，只有队长才能取消报名
    if (+eventType === 2) {
      if (teamId === void (0)) {
        return ctx.throw('缺少团队 id ！');
      }
      const team = await ctx.model.Team.queryOneData(teamId as number);
      if (userID !== (team as any).leader) {
        return ctx.throw('只有队长才能取消报名');
      }
      return await ctx.model.UserEvent.deleteTeamData(eventID, eventType, teamId as number);
    }
    return await ctx.model.UserEvent.deleteOneData(userID, eventType, eventID);
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
