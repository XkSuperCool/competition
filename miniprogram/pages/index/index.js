import { isOpenAuthority, launchAuthorize } from '../../utils/util';
import request from '../../utils/request';

Page({
  data: {
    location: '定位中',
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
  
  onReady() {
    this.locationAuth();
    this.getEventList();
  },

  async getEventList() {
    try {
      const { data } = await request('/api/competitions');
      this.setData({
        eventList: data.list,
      });
    } catch {
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
              key: 'RFMBZ-MMVCO-C3SWM-SQE2H-JPI7K-SYFMD',
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
      },
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
