Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {},
    },
    buttonClickJumpPage: {
      type: Boolean,
      value: true,
    },
    buttonText: {
      type: String,
      value: '前往报名',
    },
  },

  options: {
    addGlobalClass: ['list-item'],
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClickItem() {
      wx.navigateTo({
        url: `../event-details/index?id=${this.properties.data.id}`,
      });
    },

    handleClickButton() {
      const id = this.properties.data.id;
      if (this.properties.buttonClickJumpPage) {
        wx.navigateTo({
          url: `../event-details/index?id=${id}`,
        });
        return;
      }
      this.triggerEvent('click', id);
    },
  },
})
