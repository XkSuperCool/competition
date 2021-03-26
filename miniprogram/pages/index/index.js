import config from '../../config/index';
import request from '../../utils/request';
import { isOpenAuthority, launchAuthorize } from '../../utils/util';

let current = 1;
let pageSize = 10;
let total = 0;

Page({
  data: {
    location: '定位中',
    baseURL: config.baseURL,
    banners: [
      {
        id: 1,
        url: 'https://picsum.photos/300/200?random=1',
      },
      {
        id: 2,
        url: 'https://picsum.photos/300/200?random=2',
      },
      {
        id: 3,
        url: 'https://picsum.photos/300/200?random=3',
      },
    ],
    eventList: [],
  },

  onLoad() {
    this.locationAuth();
    this.getEventList();
  },

  // 触底加载更多
  async onReachBottom() {
    if (total !== 0 && total === this.data.eventList.length) {
      wx.showToast({
        title: '没有更多数据了...',
        icon: 'none',
      });
      return;
    }
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 10000,
    });
    current += 1;
    await this.getEventList();
    wx.hideToast();
  },

  // 进入赛事详情
  enterEventDetails(res) {
    wx.navigateTo({
      url: `../event-details/index?id=${res.currentTarget.dataset.id}`,
    });
  },

  // 获取赛事列表
  async getEventList() {
    try {
      const { data } = await request('/api/competitions', {
        params: {
          current: current,
          pageSize: pageSize,
        },
      });
      total = data.total;
      this.setData({
        eventList: [...this.data.eventList, ...data.list],
      });
    } catch (err) {
      //
    }
  },

  // 处理用户点击位置操作
  async handleLocation() {
    const isOpenUserLocation = await isOpenAuthority('userLocation');
    if (!isOpenUserLocation) {
      wx.openSetting({
        withSubscriptions: true,
        success: (res) => {
          if (res.authSetting['scope.userLocation']) {
            this.getLocation();
          }
        }
      });
    }
  },

  // 获取用户位置
  getLocation() {
    wx.getLocation({
      success: async ({ latitude, longitude }) => {
        try {
          const res = await request('https://apis.map.qq.com/ws/geocoder/v1/', {
            params: {
              location: `${latitude},${longitude}`,
              key: config.txMapKey,
            },
          });
          this.setData({
            location: res.result.address_component.city,
          });
        } catch {
          this.setData({
            location: '获取定位',
          });
        }
      }
    });
  },

  // 位置权限判断
  async locationAuth() {
    const auth = 'userLocation';
    let isOpenUserLocation = await isOpenAuthority(auth);
    if (!isOpenUserLocation) {
      isOpenUserLocation = await launchAuthorize(auth);
    }
    if (isOpenUserLocation) {
      this.getLocation();
    } else {
      this.setData({
        location: '获取定位',
      });
    }
  }
});
