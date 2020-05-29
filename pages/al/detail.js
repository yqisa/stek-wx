// pages/al/detail.js
var WxParse = require('../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src1: app.globalData.url + "alxq1.jpg",
    src2: app.globalData.url + "alxq2.jpg",
    src3: app.globalData.url + "alxq3.jpg",
    src4: app.globalData.url + "alxq4.jpg",
    nodes:"",
    htmlVal:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    var that=this
        wx.request({
          url: app.globalData.rurl + "wp-json/wp/v2/posts/" + options.id,
          method: "GET",
          data: {
          }, 
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            
            // res.data.content.rendered = res.data.content.rendered.replace(/\<img/g, '<img style="width:100%!important;height:auto;"'); 
            // res.data.content.rendered = res.data.content.rendered.replace(/figure/g, 'div'); 
            
            // console.log(res.data.content.rendered)
            // that.data.htmlVal = res.data.content.rendered
            // that.setData({
            //    nodes: res.data.content.rendered 
            //   })
            var article = '<div>我是HTML代码</div>';
            WxParse.wxParse('article', 'html', res.data.content.rendered, that, 5);
            wx.hideLoading()
          }
        })
  },

  test: function (e) {
    let that = this
    console.log("e", this.data.htmlVal)
    let arr = [];
    //let reg = /(?<=(src="))[^"]*?(?=")/ig
    let reg = new RegExp('(?<=(src="))[^ "]*?(?=")', 'ig')
    let allSrc = that.data.htmlVal.match(reg)
    for (let i = 0; i < allSrc.length; i++) {
      console.log("e000", allSrc[i])
      arr.push(allSrc[i])
      that.setData({
        imageArray: arr
      })
    }
    setTimeout(function () {
      wx.previewImage({
        current: that.data.imageArray, // 当前显示图片的http链接   
        urls: that.data.imageArray // 需要预览的图片http链接列表   
      })
    }, 500)
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