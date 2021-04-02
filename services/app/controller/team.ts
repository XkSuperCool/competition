import { Controller } from 'egg';
import { ErrorResponse, SuccessResponse } from '../uitls/ResponseModel';
import type { TeamQueryType } from '../model/Team';

export default class TeamController extends Controller {
  async index() {
    const { ctx } = this;
    const type = ctx.query.type;
    const res = await ctx.service.team.queryUserTeam(ctx.state.user.id, type as TeamQueryType);
    ctx.body = new SuccessResponse(res);
  }

  async create() {
    const { ctx } = this;
    const res = await ctx.service.team.createTeam({
      ...ctx.request.body,
      leader: ctx.state.user.id,
    });
    // 创建完团队后，立刻将其加入到团队
    await ctx.service.userTeam.createUserTeam({
      user_id: ctx.state.user.id,
      team_id: res.team_id,
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

  async show() {
    const { ctx } = this;
    const res = await ctx.service.team.queryTeamDetails(ctx.params.id);
    this.ctx.body = new SuccessResponse(res);
  }
}
