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

const HOST = 'http://192.168.137.1:7001';

/**
 * 网络请求
 * @param {stirng} url 请求路径
 * @param {object} options 请求配置
 */
const request = (url, {
  params,
  method = 'GET',
  data,
} = {}) => {
  let requestURL = url.startsWith('/api') ? HOST + url : url;
  if (method === 'GET' && params) {
    requestURL += generateQueryString(params);
  }

  return new Promise((resolve, reject) => {
    wx.request({
      method,
      url: requestURL,
      data: data ?? {},
      success(response) {
        if (response.data) {
          resolve(response.data);
        } else {
          resolve(response);
        }
      },
      fail(error) {
        reject(error);
      },
    });
  });
}

export default request;
