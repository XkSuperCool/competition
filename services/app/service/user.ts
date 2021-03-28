import { Service } from 'egg';

interface WxLoginResponse {
  openid: string;
  session_key: string;
  unionid: string;
  errcode: number;
  errmsg?: string;
}

export default class UserService extends Service {
  /**
   * 微信登录
   * @param code wx.login 返回的 code
   */
  async wxLogin(code: string) {
    const { ctx } = this;
    const { wxAPPID, wxSECRET } = this.config;
    const res = await ctx.curl<WxLoginResponse>(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${wxAPPID}&secret=${wxSECRET}&js_code=${code}&grant_type=authorization_code`,
      {
        dataType: 'json',
      },
    );
    const msg = res.data.errmsg;
    switch (res.data.errcode) {
      case -1:
        return ctx.throw(msg ?? '系统繁忙，此时请稍候再试');
      case 40029:
        return ctx.throw(msg ?? '系统繁忙，此时请稍候再试');
      case 45011:
        return ctx.throw(msg ?? '超出频率限制');
      default: break;
    }
    // todo: 返回 token 并保存登录信息
    return 'token';
  }
}
