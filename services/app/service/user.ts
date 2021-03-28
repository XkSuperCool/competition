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
    const { ctx, app } = this;
    const { wxAPPID, wxSECRET } = this.config;
    const res = await ctx.curl<WxLoginResponse>(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${wxAPPID}&secret=${wxSECRET}&js_code=${code}&grant_type=authorization_code`,
      {
        dataType: 'json',
      },
    );
    const data = res.data;
    const msg = data.errmsg;
    switch (data.errcode) {
      case -1:
        return ctx.throw(msg ?? '系统繁忙，此时请稍候再试');
      case 40029:
        return ctx.throw(msg ?? '系统繁忙，此时请稍候再试');
      case 45011:
        return ctx.throw(msg ?? '超出频率限制');
      default: break;
    }

    // 获取用户信息
    let userInfo = await ctx.model.User.findOnDataByWXOpenID(data.openid);
    if (!userInfo) {
      userInfo = await ctx.model.User.save({
        username: data.openid,
        password: data.openid,
        wx_openid: data.openid,
      });
    }
    return app.jwt.sign({
      session_key: data.session_key,
      openid: data.openid,
      id: userInfo.id,
      username: userInfo.username,
    }, app.config.jwt.secret);
  }
}
