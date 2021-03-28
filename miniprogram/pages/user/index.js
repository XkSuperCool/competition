const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token = wx.getStorageSync('token');
    if (token) {
      this.setData({
        isLogin: true,
      });
    }
  },

  // 用户登录
  async userLogin() {
    try {
      await app.userLogin();
      this.setData({
        isLogin: true,
      });
    } catch {
      //
    }
  },
})