import request from '../../utils/request';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getEventDetails(options.id);
  },

  // 获取赛事详情信息
  async getEventDetails(id) {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
    });
    try {
      const { data } = await request(`/api/competitions/${id}`);
      console.log(data);
      this.setData({
        details: data,
      });
      // 动态设置页面标题
      wx.setNavigationBarTitle({
        title: data.event_name,
      });
    } catch {
      //
    } finally {
      wx.hideToast();
    }
  }
})