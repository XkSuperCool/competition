import { queryMySignupEventList, cancelEventSignup } from '../../api/userEvent';

let current = 1;
let pageSize = 10;

Page({
  data: {
    list: [],
    total: -1,
  },

  onLoad: function() {
    this.getEventList();
  },

  // 触底加载更多
  onReachBottom() {
    current += 1;
    this.getEventList();
  },

  // 取消报名
  handleCancelSignup(event) {
    const index = this.data.list.findIndex((item) => item.competitionEvent.id === event.detail);
    const { event_id, event_type, competitionEvent: { event_name} } = this.data.list[index];
    wx.showModal({
      title: '提示',
      content: `确定要取消报名 “${event_name}” 吗？`,
      success: async ({ confirm }) => {
        if (confirm) {
          wx.showLoading();
          let isSuccess = false;
          try {
            const { data } = await cancelEventSignup(event_type, event_id);
            if (data === 'ok') {
              // 重新获取数据
              this.getEventList();
              isSuccess = true;
              wx.showToast({
                title: '取消报名成功',
                icon: 'success',
              });
              return;
            }
            wx.hideLoading();
          } catch {
            wx.hideLoading();
          }
          if (!isSuccess) {
            wx.showToast({
              title: '取消报名失败',
              icon: 'none',
            });
          }
        }
      }
    });
  },

  // 获取赛事数据
  async getEventList() {
    try {
      const { data } = await queryMySignupEventList(current, pageSize);
      this.setData({
        total: data.total,
        list: data.list,
      });
    } catch {
      //
    }
  },
});
