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
 * @param {number} current 当前页
 * @param {number} pageSize 条数
 */
export const queryEventList = (current, pageSize) => {
  return request('/api/competitions', {
    params: {
      current,
      pageSize,
    },
  })
}