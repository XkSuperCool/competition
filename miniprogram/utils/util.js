const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/**
 * 用户权限校验，判断是否开启了指定权限
 * @param {string} name 
 */
const isOpenAuthority = name => {
  return new Promise((resolve) => {
    wx.getSetting({
      withSubscriptions: true,
      success: (setting) => {
        if (setting.authSetting[`scope.${name}`]) {
          resolve(true);
        } else {
          resolve(false);
        }
      },
      fail(err) {
        resolve(false);
      },
    });
  });
}

/**
 * 对指定权限，向用户发起授权
 * @param {string} name 
 */
const launchAuthorize = name => {
  return new Promise((resolve) => {
    wx.authorize({
      scope: 'scope.userLocation',
      success () {
        resolve(true);
      },
      fail() {
        resolve(false);
      }
    })
  });
}

module.exports = {
  formatTime,
  isOpenAuthority,
  launchAuthorize
}
