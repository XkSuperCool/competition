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

/**
 * 获取我报名的赛事
 * @param {number} current 
 * @param {number} pageSize 
 */
export const queryMySignupEventList = (current, pageSize) => {
  return request('/api/userEvents', {
    params: {
      current,
      pageSize,
    },
  });
}

/**
 * 取消赛事报名
 * @param {number} eventType 赛事类型
 * @param {number} eventId 赛事 id
 */
export const cancelEventSignup = (eventType, eventId) => {
  return request('/api/cancel/signUp', {
    method: 'POST',
    data: {
      eventType,
      eventId,
    },
  });
}
