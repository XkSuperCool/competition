import request from '../utils/request';

/**
 * 创建报名信息
 * @param {object} data 信息数据
 */
export const createSignUp = (data) => {
  return request('/api/userEvents', {
    data,
    method: 'POST',
  });
}