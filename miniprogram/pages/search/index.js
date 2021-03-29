Page({
  data: {
    history: [],
  },

  onLoad: function() {
    wx.getStorage({
      key: 'search-history',
      success: ({ data }) => {
        this.setData({
          history: JSON.parse(data),
        });
      },
    });
  },

  // 点击搜索历史
  handleClickHistoryItem(event) {
    const value = event.currentTarget.dataset.keywords;
    wx.navigateTo({
      url: `/pages/event-list/index?keywords=${value}`,
    });
  },

  // 清除历史记录
  handleClearHistory() {
    this.setData({
      history: [],
    });
    wx.removeStorage({
      key: 'search-history',
    });
  },

  // 处理搜索
  handleSearch(event) {
    const value = event.detail.value.trim();
    if (!value) {
      return;
    }
    const history = [...this.data.history];
    const index = history.findIndex((item) => item === value);
    if (index !== -1) {
      history.splice(index, 1);
    }
    history.unshift(value);
    if (history.length >= 20) {
      history.pop();
    }
    wx.setStorage({
      key: 'search-history',
      data: JSON.stringify(history),
    });
    wx.navigateTo({
      url: `/pages/event-list/index?keywords=${value}`,
    });
  },
});
