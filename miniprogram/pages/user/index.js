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
    
  },

  onShow() {
    this.setData({
      isLogin: getApp().globalData.isLogin,
    });
  },

  // 用户登录
  async userLogin() {
    try {
      await app.userLogin();
    } catch {
      //
    }
  },
})