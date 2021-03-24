import { Controller } from 'egg';
import { SuccessResponse } from '../uitls/ResponseModel';
import { formatPageParams } from '../uitls';

export default class UserEventController extends Controller {
  async index() {
    const { ctx } = this;
    const { current, pageSize } = formatPageParams(ctx);
    // todo: 这里的用户 id 需要再已登录用户的缓存中获取
    const res = await ctx.service.userEvent.findUserEvent(1, current, pageSize);
    ctx.body = new SuccessResponse(res);
  }

  async create() {
    const { ctx } = this;
    const res = await ctx.service.userEvent.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = new SuccessResponse(res);
  }
}
