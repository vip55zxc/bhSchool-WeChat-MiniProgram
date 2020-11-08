//获取应用实例
import regeneratorRuntime from '../../assets/lib/regenerator-runtime/runtime.js'
import { wxRequest } from '../../utils/util.js'
const app = getApp()

Page({
  data: {
    list: []
  },
  onLoad:function(){
    this.getStoreList()
    app.share()
  },
  onShow:function() {
    this.getStoreList()
  },
  //点击电话号事件
  onCallTap: function(e) {
    console.log(e)
    //拿到电话号
    var phone = e.currentTarget.dataset.phone;
    wx.showActionSheet({
      itemList: ['拨号', '复制'],
      success: function(res) {
        console.log(res);
        if (res.tapIndex == 0) {
          wx.makePhoneCall({
            phoneNumber: phone //拨打电话
          })
        } else {
          wx.setClipboardData({
            data: phone,
            success: function(res) {
              wx.showToast({
                title: '复制成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  //从数据库拿到数据！
  getStoreList: async function () {
    var that = this
    const res = await wxRequest(`${app.globalData.baseUrl}/store?isPaging=false`, {
      hideLoading: false,
    })
    if (res.statusCode == 200) {
      that.setData({
        list: res.data.data.list
      })
    } else {
      // 失败提示
      wx.showToast({
        title: '加载ing',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  //点击店铺名事件
  kindToggle: function (e) {
    var id = e.currentTarget.id,
    list = this.data.list;
    
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i]._id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },

});