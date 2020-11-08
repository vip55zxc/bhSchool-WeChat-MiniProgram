var postsData = require('../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      posts_key: postsData.postList,
      posts_swiper: postsData.swiper,
    })
  },

  // 跳转
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    //console.log("postId  "+postId);
    wx.navigateTo({
      //让onLoad: 拿到id
      url: 'post-detail/post-detail?id=' + postId,
    })

  },
  onSwiperTap: function (event) {
    var postId = event.target.dataset.postid;
    //console.log("postId  "+postId);
    wx.navigateTo({
    //让onLoad: 拿到id
      url: 'post-detail/post-detail?id=' + postId,
    })

  }
})