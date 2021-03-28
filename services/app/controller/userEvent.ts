import { Controller } from 'egg';
import { ErrorResponse, SuccessResponse } from '../uitls/ResponseModel';
import { formatPageParams } from '../uitls';
import type { UserEventInstance } from '../model/UserEvent';

export default class UserEventController extends Controller {
  async index() {
    const { ctx } = this;
    const { current, pageSize } = formatPageParams(ctx);
    const userId = ctx.query.userId;
    if (!userId) {
      ctx.body = new ErrorResponse(401, '缺少 userId');
      return;
    }
    const res = await ctx.service.userEvent.findUserEvent(+userId, current, pageSize);
    ctx.body = new SuccessResponse(res);
  }

  async create() {
    const { ctx } = this;
    const service = ctx.service;
    const body = ctx.request.body as UserEventInstance;
    // 判断是否已经报名过
    const checked = await service.userEvent.checkedUserIsSignUpEvent(body.user_id, body.event_id);
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
    const { userId, eventId } = ctx.request.body;
    if (!userId || !eventId) {
      ctx.body = new ErrorResponse(401, '缺少 userId 或 eventId');
      return;
    }
    const res = await ctx.service.userEvent.checkedUserIsSignUpEvent(userId, eventId);
    ctx.body = new SuccessResponse(res);
  }
}
