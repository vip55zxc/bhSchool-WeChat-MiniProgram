var postsData = require('../../../data/posts-data.js')
var app =getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var globalData = app.globalData;
    var that = this;
    var postId = options.id;
    // this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData,
      currentPostId: postId
    })

    var postsCollected = wx.getStorageSync("posts_collected")
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      if (postCollected) {
        this.setData({
          collected: postCollected
        })
      }
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
    if(app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId == postId){
      this.setData({
        isPlayingMusic:true
      })
    }
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.g_currentMusicPostId = that.data.currentPostId;
    })
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.g_currentMusicPostId = null;
    })

  },

  onColletionTap: function(event) {
    this.getPostsCollectedAsy();
  },
  //异步
  getPostsCollectedAsy: function() {
    var that = this;
    wx.getStorage({
      key: 'posts_collected',
      success: function(res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        //收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        //文章是否的缓存值
        wx.setStorageSync('posts_collected', postsCollected);
        //更新数据绑定变量，从而实现切换图片
        that.setData({
          collected: postCollected
        })
        wx.showToast({
          title: postCollected ? '收藏成功！' : '取消成功！',
          icon: 'success',
          duration: 2000
        })
      }

    })

  },
  //同步
  getPostsCollectedSyc: function() {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    //收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    //文章是否的缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    //更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })
  },
  onShareTap: function(event) {
    wx.showActionSheet({
      itemList: ['分享到QQ', '分享到微博', '分享到支付宝'],
      success: function(res) {
        console.log(res);
        wx.showModal({
          title: '提示',
          content: 'ss',
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  onMusicTap: function(event) {
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    var that = this;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      that.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  },
})