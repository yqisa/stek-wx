// pages/hd/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: [

      app.globalData.url + "zx2.jpg",
      app.globalData.url + "zx2.jpg",
    ],
    banner: app.globalData.url + "hd1.jpg",
    category_thumbnail_image: '',
    n: '',
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  detail: function (e) {
    wx.navigateTo({
      url: '/pages/al/detail?id=' + e.currentTarget.dataset.a,
    })
  },
  onLoad: function (options) {
    var that = this;
    var n = '';
    console.log(options)
    that.data.name=options.name
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.rurl + "wp-json/wp/v2/posts",
      method: "GET",
      data: {
        search: options.name
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        that.setData({
          list:res.data
        })
        wx.hideLoading()
      }
    })
    // wx.request({
    //   url: app.globalData.rurl + "wp-json/wp/v2/search?title=" + options.name,
    //   method: "GET",
    //   data: {
    //     // title: options.name
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success(res) {
    //     console.log(res)
    //     that.setData({
    //       list: res.data
    //     })
    //     wx.hideLoading()
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onload()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})