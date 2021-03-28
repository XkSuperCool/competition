import { queryEventDetails } from '../../api/event';
import { createSignUp } from '../../api/userEvent';

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
    wx.showShareMenu({
      withShareTicket: true,
    });
  },

  // 获取赛事详情信息
  async getEventDetails(id) {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
    });
    try {
      const { data } = await queryEventDetails(id);
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
  },

  // 赛事报名
  async handleSignUp() {
    const details = this.data.details;
    let eventType = details.event_type;
    // 判断是不是既有个人赛又有团队赛, 用户选择需要报名哪个类型
    if (eventType === 3) {
      const type = await this.handleUserSelectEventType();
      if (type === void(0)) {
        return;
      };
      eventType = type;
    }
    // 获取报名费用
    let cost = 0;
    if (eventType === 1) {
      cost = details.cost;
    } else {
      cost = details.team_cost;
    }

    if (details.data_structure) {
      // 跳转页面填写报名信息
      return;
    }
    wx.showModal({
      title: '报名提示',
      content: `您确定要报名 “${details.event_name}” 吗？`,
      success: async (res) => {
        if (res.confirm) {
          // TODO: 如果需要付款则需要弹出付款框
          const { data } = await createSignUp({
            user_id: 1,
            event_id: details.id,
            event_type: eventType,
          });
          console.log(data);
        }
      },
    })
  },

  // 用户选择赛事类型
  handleUserSelectEventType() {
    return new Promise((resolve) => {
      wx.showActionSheet({
        itemList: ['个人赛', '团队赛'],
        success({ tapIndex }) {
          resolve(tapIndex);
        },
        fail() {
          resolve();
        },
      });
    });
  },
})