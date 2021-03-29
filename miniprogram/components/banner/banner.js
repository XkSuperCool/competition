// components/banner/banner.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Array,
      value: [],
    },
    dot: {
      type: Boolean,
      value: true,
    },
  },

  observers: {
    'data'(value) {
      const banners = value.map((item, index) => ({
        url: item.url ?? item,
        id: item.id ?? index,
      }));
      this.setData({
        banners,
      });
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    banners: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
