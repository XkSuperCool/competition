import { Service } from 'egg';
import type { UserTeamInstance } from '../model/UserTeam';

export default class UserTeamService extends Service {
  createUserTeam(data: UserTeamInstance) {
    const { ctx } = this;
    return ctx.model.UserTeam.save(data);
  }
}
