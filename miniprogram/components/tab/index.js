Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: [],
    },
    activeIndex: {
      type: Number,
      value: 0,
    },
  },

  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClickTab(event) {
      this.triggerEvent('change', event.target.dataset.type);
    },
  }
})
