import { Controller } from 'egg';
import { ErrorResponse, SuccessResponse } from '../uitls/ResponseModel';

export default class TeamController extends Controller {
  async create() {
    const { ctx } = this;
    const res = await ctx.service.team.createTeam({
      ...ctx.request.body,
      leader: ctx.state.user.id,
    });
    ctx.body = new SuccessResponse(res);
  }

  async update() {
    const { ctx } = this;
    const res = await ctx.service.team.updateTeam(
      ctx.state.user.id,
      ctx.request.body,
    );
    ctx.body = new SuccessResponse(res);
  }

  async destroy() {
    const { ctx } = this;
    const teamId = ctx.query.id;
    if (!teamId) {
      return new ErrorResponse(40002, '缺少团队 id');
    }
    const res = await ctx.service.team.deleteTeam(
      ctx.state.user.id,
      +teamId,
    );
    ctx.body = new SuccessResponse(res);
  }
}
