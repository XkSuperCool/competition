Page({
  data: {
    listType: 0,
    teamList: [
      {
        id: 1,
        members: [1, 2, 3, 4, 5],
      },
      {
        id: 2,
        members: [1, 2, 3, 4, 5],
      },
    ],
  },

  // 切换 tab
  handleChangeTab(event) {
    this.setData({
      listType: +event.detail,
    });
  },
});
