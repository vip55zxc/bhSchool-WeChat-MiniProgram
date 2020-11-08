//获取应用实例
import regeneratorRuntime from '../../../assets/lib/regenerator-runtime/runtime.js'
import { wxRequest } from '../../../utils/util.js'
const app = getApp()
//店铺信息
var shopName;
var address;
var shopId;
Page({
  data: {

  },
  onLoad:function(options){
    //拿到点击商店的id
    shopId = options.shopId;
    shopName = options.shopName;
    address = options.address;
    this.setData({
      name: shopName,
      address: address
    })
    this.getGoodsList()
    app.share()
  },
  onShow: function () {
    this.getGoodsList()
  },
  getGoodsList: async function () {
    var that = this
    const res = await wxRequest(`${app.globalData.baseUrl}/store/querylistbystore/${shopId}?isPaging=false`, {
      hideLoading: false,
    })
    if (res.statusCode == 200) {
      that.setData({
        list: res.data.data
      })
    } else {
      // 失败提示
      wx.showToast({
        title: '加载ing',
        icon: 'loading',
        duration: 2000
      })
    }
  }
});