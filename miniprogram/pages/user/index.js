const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
  },

  onShow() {
    this.setData({
      isLogin: app.globalData.isLogin,
    });
  },

  // 用户登录
  async userLogin() {
    const isLogin = await app.userLogin();
    if (isLogin) {
      this.setData({
        isLogin: true,
      });
    }
  },

  // 跳转页面中间检验
  jumpPage(event) {
    if (this.data.isLogin) {
      wx.navigateTo({
        url: event.target.dataset.url,
      });
    } else {
      wx.showToast({
        icon: 'none',
        title: '请先登录！',
      });
    }
  },

  // 注销
  handleLogOut() {
    wx.showModal({
      title: '提示',
      content: '您确定要注销吗？',
      success: ({ confirm }) => {
        if (confirm) {
          wx.removeStorageSync('token');
          this.setData({
            isLogin: false,
          });
          app.setIsLogin(false);
        }
      }
    });
  }
})