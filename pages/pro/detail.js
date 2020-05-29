// pages/pro/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src1: app.globalData.url + "xq1.jpg",
    src2: app.globalData.url + "xq2.jpg",
    src3: app.globalData.url + "xq3.jpg",
    src4: app.globalData.url + "xq4.jpg",
    page: 1,
    maxsize: 5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  next: function (e) {
    if (this.data.page < this.data.maxsize) {
      this.data.page = this.data.page + 1
    } else {
      this.data.page = 1
    }
    this.setData({
      page: this.data.page
    })
  },
  last: function (e) {
    if (this.data.page > 1) {
      this.data.page = this.data.page - 1
    } else {
      this.data.page = 5
    }
    this.setData({
      page: this.data.page
    })
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