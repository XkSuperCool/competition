import { queryEventList } from '../../api/event';

let current = 1,
    pageSize = 10,
    keywords = '';

Page({
  data: {
    list: [],
    total: -1,
  },

  onLoad(option) {
    keywords = option.keywords;
    this.getListData();
  },

  onReachBottom() {
    current += 1;
    this.getListData();
  },

  // 获取列表数据
  getListData() {
    queryEventList({
      current,
      pageSize,
      keywords,
    }).then(({ data }) => {
      this.setData({
        total: data.total,
        list: [...this.data.list, ...data.list],
      });
    });
  },
});
