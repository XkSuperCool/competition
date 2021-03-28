import { Controller } from 'egg';
import { ErrorResponse, SuccessResponse } from '../uitls/ResponseModel';
import { formatPageParams } from '../uitls';
import type { UserEventInstance } from '../model/UserEvent';

export default class UserEventController extends Controller {
  async index() {
    const { ctx } = this;
    const { current, pageSize } = formatPageParams(ctx);
    const res = await ctx.service.userEvent.findUserEvent(ctx.state.user.id, current, pageSize);
    ctx.body = new SuccessResponse(res);
  }

  async create() {
    const { ctx } = this;
    const service = ctx.service;
    const body = ctx.request.body as UserEventInstance;
    // 判断是否已经报名过
    const checked = await service.userEvent.checkedUserIsSignUpEvent(ctx.state.user.id, body.event_id);
    if (
      (body.event_type === 1 && checked === 'alone') ||
      (body.event_type === 2 && checked === 'team') ||
      checked === 'all'
    ) {
      ctx.body = new ErrorResponse(401, '已报名该赛事，不能重复报名！');
      return;
    }
    const res = await service.userEvent.create(body);
    ctx.status = 201;
    ctx.body = new SuccessResponse(res);
  }

  async userEventChecked() {
    const { ctx } = this;
    const { eventId } = ctx.request.body;
    if (!eventId) {
      ctx.body = new ErrorResponse(401, '缺少 eventId');
      return;
    }
    const res = await ctx.service.userEvent.checkedUserIsSignUpEvent(ctx.state.user.id, eventId);
    ctx.body = new SuccessResponse(res);
  }
}
