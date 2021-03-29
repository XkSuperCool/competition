import config from '../../config/index';
const plugin = requirePlugin('routePlan');

Page({
  data: {
    lat: '',
    lng: '',
    address: '',
    markers: [],
  },
  onLoad: function(options) {
    this.setData({
      lat: options.lat,
      lng: options.lng,
      address: options.address,
      markers: [{
        id: 1,
        latitude: options.lat,
        longitude: options.lng,
        iconPath: '../../assets/images/location.png',
        width: 44,
        height: 44,
      }]
    });
  },

  // 路径规划
  routePlan() {
    let key = config.txMapKey;
    let referer = 'fxy';
    let endPoint = JSON.stringify({
      name: this.data.address,
      'latitude': this.data.lat,
      'longitude': this.data.lng,
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint,
    });
  },

  // 处理路径规划，判断是否开启了定位权限
  handleRoutePlan() {
    wx.getSetting({
      withSubscriptions: true,
      success: (settring) => {
        if (!settring.authSetting['scope.userLocation']) {
          wx.showModal({
            title: '您尚未开启定位权限，需要开启定位权限后才能使用路径规划功能',
            confirmText: '去开启',
            success({ confirm }) {
              if (confirm) {
                wx.openSetting({
                  success: (res) => {
                    if (res.authSetting['scope.userLocation']) {
                      this.routePlan();
                    } else {
                      wx.showToast({
                        title: '获取位置失败',
                        icon: 'none',
                      });
                    }
                  },
                  fail: () => {
                    wx.showToast({
                      title: '获取位置失败',
                      icon: 'none',
                    });
                  }
                });
              }
            },
          });
        } else {
          this.routePlan();
        }
      },
    })
  },
})