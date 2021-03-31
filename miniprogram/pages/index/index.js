import config from '../../config/index';
import { queryEventList } from '../../api/event';
import { inverseAddressAnalysis } from '../../api/map';
import { isOpenAuthority, launchAuthorize } from '../../utils/util';

let current = 1;
let pageSize = 10;
let total = 0;
// 是否可以上拉加载更多
let more = true;
// 屏幕的宽度
let windowWidth = 0;

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
    listType: 0,
  },

  onLoad() {
    this.locationAuth();
    this.getEventList();
    wx.getSystemInfo({
      success: (info) => {
        // 储存屏幕的宽度
        windowWidth = info.windowWidth;
      },
    });
  },

  // 切换 listType
  handleToggleListType(event) {
    if (event.detail !== void(0)) {
      this.setData({
        listType: +event.detail,
      });
      // 数据重置
      current = 1;
      more = true;
      this.data.eventList = [];
      // 重新获取数据
      this.getEventList();
      // 滚动到底部
      wx.pageScrollTo({
        scrollTop: (windowWidth / 750) * 370, // 通过 rpx 计算出 px
        duration: 100,
      });
    }
  },

  // 触底加载更多
  onReachBottom() {
    if (!more) {
      return;
    }
    if (total !== 0 && total === this.data.eventList.length) {
      more = false;
      wx.showToast({
        title: '没有更多数据了...',
        icon: 'none',
      });
      setTimeout(() => {
        more = true;
      }, 10000);
      return;
    }
    current += 1;
    this.getEventList();
  },

  // 获取赛事列表
  async getEventList() {
    try {
      wx.showToast({
        title: '加载中...',
        icon: 'loading',
        duration: 10000,
      });
      const { data } = await queryEventList({
        current,
        pageSize,
        type: this.data.listType !== 0 ? this.data.listType : null,
      });
      total = data.total;
      this.setData({
        eventList: [...this.data.eventList, ...data.list],
      });
    } catch (err) {
      //
    } finally {
      wx.hideToast();
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
        },
      });
    }
  },

  // 获取用户位置
  getLocation() {
    wx.getLocation({
      success: async ({ latitude, longitude }) => {
        try {
          const res = await inverseAddressAnalysis(latitude, longitude);
          this.setData({
            location: res.result.address_component.city,
          });
        } catch (err) {
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
