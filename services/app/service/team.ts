import { Service } from 'egg';
import type { TeamInstance } from '../model/Team';

export default class TeamService extends Service {
  createTeam(data: TeamInstance) {
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
}
