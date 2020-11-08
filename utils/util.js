// util.js
import regeneratorRuntime from './../assets/lib/regenerator-runtime/runtime.js'

// 封装wxRequest
// 改进: wx.request API支持async-await语法
const wxRequest = async (url, params = {}) => {

  // Object.assign(params, {
  //   token: wx.getStorageSync('token')
  // })

  // 所有的请求，header默认携带token
  let header = params.header || {
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'Authorization': `Basic ${params.token}` || ''
  }
  let data = params.data || {}
  let method = params.method || 'GET'
  // hideLoading可以控制是否显示加载状态
  if (!params.hideLoading) {
    wx.showLoading({
      title: '加载中...',
    })
  }
  let res = await new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: header,
      success: (res) => {
        if (res || res.data.code == 500 /*&& res.statusCode == 200*/) {
            resolve(res/*.data*/)
        } else {
          wx.showToast({
            icon: 'loading',
            title: '服务器500错误，有人要扣奖金啦~',
          })
          reject(res)
        }
      },
      fail: (err) => {
        wx.showToast({
          icon: 'loading',
          title: '服务器500错误，有人要扣奖金啦~',
        })
        reject(err)
      },
      complete: (e) => {
        wx.hideLoading()
      }
    })
  })
  return res
}

export {
  wxRequest
}