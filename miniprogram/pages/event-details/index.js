import { queryEventDetails } from '../../api/event';
import { addressAnalysis } from '../../api/map';
import { createSignUp, getSignUpStatus } from '../../api/userEvent';

const app = getApp();
let isLogin = app.globalData.isLogin;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: {},
    isSignUp: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData(options.id);
    wx.showShareMenu({
      withShareTicket: true,
    });
  },

  // 初始化数据
  async initData(id) {
    await this.getEventDetails(id);
    if (isLogin) {
      this.getSignUpStatus();
    }
  },

  // 处理赛事举办位置，跳转到 Map 页面
  async handlePositioning() {
    const details = this.data.details;
    let lat, lng;
    const address = `${details.province} ${details.city} ${details.district} ${details.detailed_location}`;
    if (!details.latitude && !details.longitude) {
      const res = await addressAnalysis(address);
      lat = res.result.location.lat;
      lng = res.result.location.lng;
    } else {
      lat = details.latitude;
      lng = details.longitude;
    }
    wx.navigateTo({
      url: `/pages/map/index?lat=${lat}&lng=${lng}&address=${address}`,
    });
  },

  // 获取报名状态
  async getSignUpStatus() {
    try {
      const details = this.data.details;
      const { data } = await getSignUpStatus(details.id);
      if (
        (details.event_type === 1 && data === 'alone') || // 当前赛事只有个人赛且已报名过
        (details.event_type === 2 && data === 'team') || // 当前赛事只有团队赛且已报名过
        (details.event_type === 3 && data === 'all') // 当前赛事既有个人赛又有团队赛，且都报名过
      ) {
        this.setData({
          isSignUp: true,
        });
      }
    } catch {
      //
    }
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
    // 未登录需要先登录
    if (!isLogin) {
      this.userLogin();
      return;
    }
    // 已报名 return
    if (this.data.isSignUp) {
      return;
    }
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
      content: `您确定要报名 “${details.event_name} (${eventType === 1 ? '个人赛' : '团队赛'})” 吗？`,
      success: async (res) => {
        if (res.confirm) {
          // TODO: 如果需要付款则需要弹出付款框
          try {
            await createSignUp({
              event_id: details.id,
              event_type: eventType,
            });
            // 更新报名状态
            this.getSignUpStatus();
            wx.showToast({
              title: '报名成功',
              icon: 'success',
            });
          } catch {
            //
          }
        }
      },
    })
  },

  // 用户报名
  userLogin() {
    wx.showModal({
      title: '登录提示',
      content: '您未登录，需要先登录!',
      success: async ({ confirm }) => {
        if (confirm) {
          app.userLogin().then(() => {
            isLogin = true;
            this.getSignUpStatus();
          });
        }
      },
    });
  },

  // 用户选择赛事类型
  handleUserSelectEventType() {
    return new Promise((resolve) => {
      wx.showActionSheet({
        itemList: ['个人赛', '团队赛'],
        success({ tapIndex }) {
          resolve(tapIndex + 1);
        },
        fail() {
          resolve();
        },
      });
    });
  },
})