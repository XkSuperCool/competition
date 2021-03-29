import { Controller } from 'egg';
import { SuccessResponse } from '../uitls/ResponseModel';
import { formatPageParams } from '../uitls';

export default class CompetitionEventController extends Controller {
  async index() {
    const { ctx } = this;
    const { current, pageSize } = formatPageParams(ctx);
    const res = await ctx.service.competitionEvent.findAll(current, pageSize, ctx.query.keywords);
    ctx.body = new SuccessResponse(res);
  }

  async show() {
    const { ctx } = this;
    const res = await ctx.service.competitionEvent.findOne(ctx.params.id);
    if (!res) {
      ctx.throw(404, '未查询到相关数据');
      return;
    }
    ctx.body = new SuccessResponse(res);
  }

  async create() {
    const { ctx } = this;
    ctx.status = 201;
    const res = await ctx.service.competitionEvent.create(ctx.request.body);
    ctx.body = new SuccessResponse(res);
  }
}
