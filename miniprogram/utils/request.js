import config from '../config/index';

/**
 * 生成查询字符串
 * @param {object} params 
 */
const generateQueryString = (params) => {
  let queryString = '';
  for (const key of Object.keys(params)) {
    queryString += `${key}=${params[key]}&`;
  }
  return `?${queryString.replace(/&$/, '')}`;
}

/**
 * 网络请求
 * @param {stirng} url 请求路径
 * @param {object} options 请求配置
 */
const request = (url, {
  data,
  params,
  method = 'GET',
  headers = {},
} = {}) => {
  let requestURL = url.startsWith('/api') ? config.baseURL + url : url;
  if (method === 'GET' && params) {
    requestURL += generateQueryString(params);
  }

  const header = {
    ...headers,
  }
  const token = wx.getStorageSync('token');
  if (token) {
    header.Authorization = `Bearer ${token}`;
  }
  
  return new Promise((resolve, reject) => {
    wx.request({
      method,
      url: requestURL,
      data: data ?? {},
      header: header,
      success(response) {
        if (url.startsWith('/api')) {
          if (response.data.code === 200) {
            resolve(response.data);
          } else {
            wx.showToast({
              title: response.data.message ?? '出现错误，请稍后再试！',
              icon: 'none'
            });
          }
        } else {
          resolve(response.data);
        }
      },
      fail(error) {
        reject(error);
      },
    });
  });
}

export default request;
