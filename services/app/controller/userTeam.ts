import { Controller } from 'egg';
import { SuccessResponse } from '../uitls/ResponseModel';

export default class UserTeamController extends Controller {
  async create() {
    const { ctx } = this;
    const res = await ctx.service.userTeam.createUserTeam({
      user_id: ctx.state.user.id,
      team_id: ctx.request.body.id,
    });
    ctx.body = new SuccessResponse(res);
  }
}
