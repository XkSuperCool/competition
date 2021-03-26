import { isOpenAuthority, launchAuthorize } from '../../utils/util';

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
  },
  onReady() {
    this.locationAuth();
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
      success: ({ latitude, longitude }) => {
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&',
          success: (res) => {
            console.log(res);
            this.setData({
              location: '济南',
            });
          }
        });
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
