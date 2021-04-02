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
    console.log(checked);
    if (
      (+body.event_type === 1 && checked === 'alone') ||
      (+body.event_type === 2 && checked === 'team') ||
      checked === 'all'
    ) {
      ctx.body = new ErrorResponse(401, '已报名该赛事，不能重复报名！');
      return;
    }
    try {
      const res = await service.userEvent.create({
        user_id: ctx.state.user.id,
        event_id: body.event_id,
        event_type: body.event_type,
        team_id: body.team_id,
      });
      ctx.status = 201;
      ctx.body = new SuccessResponse(res);
    } catch (error) {
      ctx.body = new ErrorResponse(4001, error);
    }
  }

  async cancelSignUp() {
    const { ctx } = this;
    try {
      const res = await this.service.userEvent.delete(
        +ctx.state.user.id,
        +ctx.request.body.eventType,
        +ctx.request.body.eventId,
        ctx.request.body.teamId,
      );
      console.log(res);
      if (res >= 1) {
        ctx.body = new SuccessResponse('ok');
      } else {
        ctx.body = new ErrorResponse(4002, '取消报名失败，请稍后再试！');
      }
    } catch (err) {
      ctx.body = new ErrorResponse(4001, err);
    }
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
