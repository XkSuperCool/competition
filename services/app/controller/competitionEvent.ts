import { Controller } from 'egg';

export default class CompetitionEventController extends Controller {
  async index() {
    const { ctx } = this;
    try {
      const res = await ctx.service.competitionEvent.findAll();
      ctx.body = {
        total: res.count,
        list: res.rows,
      };
    } catch {
      ctx.body = [];
    }
  }

  async show() {
    const { ctx } = this;
    if (!ctx.params.id) {
      ctx.body = '未找到对应结果!';
    }
    try {
      ctx.body = await ctx.service.competitionEvent.findOne(ctx.params.id) ?? {};
    } catch {
      ctx.body = '未找到对应结果!';
    }
  }

  async create() {
    const { ctx } = this;
    try {
      ctx.body = await ctx.service.competitionEvent.create(ctx.request.body);
    } catch {
      ctx.body = false;
    }
  }
}
