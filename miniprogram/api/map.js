import request from '../utils/request';
import config from '../config/index';

const mapService = 'https://apis.map.qq.com/ws/geocoder/v1/';

/**
 * 地址解析
 * @param {string}} address 地址
 */
export const addressAnalysis = (address) => {
  return request(mapService, {
    params: {
      address,
      key: config.txMapKey,
    },
  });
}

/**
 * 逆地址解析
 * @param {number} latitude 
 * @param {number} longitude 
 */
export const inverseAddressAnalysis = (latitude, longitude) => {
  return request(mapService, {
    params: {
      location: `${latitude},${longitude}`,
      key: config.txMapKey,
    },
  });
}