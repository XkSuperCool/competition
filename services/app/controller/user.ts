import { Controller } from 'egg';
import { SuccessResponse } from '../uitls/ResponseModel';

export default class UserController extends Controller {
  async wxLogin() {
    const { ctx } = this;
    if (!ctx.params.code) {
      ctx.throw(404, '缺少微信小程序的 code');
      return;
    }
    const res = await this.service.user.wxLogin(ctx.params.code);
    ctx.body = new SuccessResponse(res);
  }
}
