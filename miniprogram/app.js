import request from './utils/request';

App({
  onLaunch() {
    wx.checkSession({
      fail() {
        wx.removeStorage({ key: 'token' });
        wx.showModal({
          title: '登录过期，是否重新登录',
          icon: 'none',
          success: async (res) => {
            if (res.confirm) {
              await this.userLogin();
            }
          },
        });
      },
    });
  },
  globalData: {
    userInfo: null
  },
  // 用户登录
  userLogin() {
    return new Promise((resolve) => {
      wx.login({
        success: async ({ code }) => {
          try {
            const { data: token } = await request('/api/wxLogin', {
              method: 'POST',
              data: {
                code,
              },
            });
            if (token) {
              wx.setStorageSync('token', token);
              resolve();
            }
          } catch {
            wx.showToast({
              title: '登录失败',
              icon: null,
            });
          }
        },
        fail: () => {
          wx.showToast({
            title: '登录失败',
            icon: null,
          });
        },
      });
    });
  },
})
