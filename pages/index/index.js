//index.js
//获取应用实例
import regeneratorRuntime from '../../assets/lib/regenerator-runtime/runtime.js'
import { wxRequest } from '../../utils/util.js'
const app = getApp()

Page({
  data: {
    list: []
  },
  onLoad: function() {
    this.getGgList()
    app.share()
  },
  onShow: function() {
    this.getGgList()
  },
  
  getGgList: async function() {
    var that = this
    const res = await wxRequest(`${app.globalData.baseUrl}/gg?isPaging=false`,{
      hideLoading: false,
    })
    if(res.statusCode == 200) {
      that.setData({
        list: res.data.data.list
      })
    }else{
      // 失败提示
      wx.showToast({
        title: '加载ing',
        icon: 'loading',
        duration: 2000
      })
    }
  }
})