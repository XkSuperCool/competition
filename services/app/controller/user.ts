import { Controller } from 'egg';
import { SuccessResponse, ErrorResponse } from '../uitls/ResponseModel';

export default class UserController extends Controller {
  async wxLogin() {
    const { ctx } = this;
    const code = ctx.request.body.code;
    if (!code) {
      ctx.body = new ErrorResponse(401, '缺少微信小程序 code');
      return;
    }
    const res = await this.service.user.wxLogin(code);
    ctx.body = new SuccessResponse(res);
  }
}
