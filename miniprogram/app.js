import request from './utils/request';

App({
  onLaunch() {
    const token = wx.getStorageSync('token');
    if (token) {
      this.globalData.isLogin = true;
    }
  },
  globalData: {
    userInfo: null,
    isLogin: false,
  },

  // 用户登录
  userLogin() {
    return new Promise((resolve) => {
      wx.login({
        success: async ({ code }) => {
          wx.showLoading({
            title: '登录中...',
          });
          try {
            const { data: token } = await request('/api/wxLogin', {
              method: 'POST',
              data: {
                code,
              },
            });
            if (token) {
              resolve(true);
              wx.setStorageSync('token', token);
              this.globalData.isLogin = true;
              wx.hideLoading();
              wx.showToast({
                title: '登录成功',
                icon: 'success',
              });
            }
          } catch {
            this.globalData.isLogin = false;
            wx.hideLoading();
            wx.showToast({
              title: '登录失败',
              icon: null,
            });
            resolve(false);
          }
        },
        fail: () => {
          this.globalData.isLogin = false;
          wx.showToast({
            title: '登录失败',
            icon: null,
          });
        },
      });
    });
  },

  // 设置登录状态
  setIsLogin(status) {
    this.globalData.isLogin = status;
  },
})
