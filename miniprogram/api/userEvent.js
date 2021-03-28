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

/**
 * 检查用户是否报名
 * @param {number} userId 
 * @param {number} eventId 
 */
export const getSignUpStatus = (eventId) => {
  return request('/api/userEventChecked', {
    data: {
      eventId
    },
    method: 'POST',
  });
}