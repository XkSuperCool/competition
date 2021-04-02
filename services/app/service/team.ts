import { Service } from 'egg';
import type { TeamInstance, TeamQueryType } from '../model/Team';

export default class TeamService extends Service {
  createTeam(data: TeamInstance): Promise<any> {
    const { ctx } = this;
    return ctx.model.Team.save(data);
  }

  updateTeam(id: number, data: TeamInstance) {
    const { ctx } = this;
    return ctx.model.Team.updateTeam(data, id);
  }

  deleteTeam(leader: number, teamId: number) {
    const { ctx } = this;
    return ctx.model.Team.deleteTeam(leader, teamId);
  }

  queryUserTeam(userId: number, type?: TeamQueryType) {
    const { ctx } = this;
    return ctx.model.Team.query(userId, type);
  }

  queryTeamDetails(id: number) {
    const { ctx } = this;
    return ctx.model.Team.queryTeamWithMemberById(id);
  }
}
