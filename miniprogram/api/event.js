import request from '../utils/request';

/**
 * 查询赛事详情
 * @param {string} id 赛事 ID
 */
export const queryEventDetails = (id) => {
  return request(`/api/competitions/${id}`);
}

/**
 * 分页，查询赛事列表
 * @param {object} options 配置项，具体如下：
 * @param {number} current 当前页
 * @param {number} pageSize 条数
 */
export const queryEventList = ({ current, pageSize, keywords, type }) => {
  const params = {
    current,
    pageSize,
  }
  if (keywords) {
    params.keywords = keywords;
  }
  if (type) {
    params.eventType = type;
  }
  return request('/api/competitions', {
    params,
  });
}