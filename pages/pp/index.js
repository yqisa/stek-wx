// pages/pp/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: app.globalData.url + "pp.jpg",
    id:0,
    listAdId: '0',
    n: '',
    list:[
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  detail: function (e) {
    wx.navigateTo({
      url: '/pages/pp/detail?id=' + e.currentTarget.dataset.a + '&title=' + e.currentTarget.dataset.b + '&time=' + e.currentTarget.dataset.c + '&url=' + e.currentTarget.dataset.d,
    })
  },
  onLoad: function (options) {
    var that = this;
    var n = '';
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.rurl + "wp-json/wp/v2/categories",
      method: "GET",
      data: {
        per_page: 50
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          navlist: res.data
        })
        var array = []
        var arrayid = []
        console.log(res)
        for (var i in res.data) {
          if (res.data[i].slug == 'pp') {
            n = res.data[i].id
            that.data.n = n
          }
        }

        wx.request({
          url: app.globalData.rurl + "wp-json/wp/v2/posts/?categories=" + that.data.n,
          method: "GET",
          data: {

          },
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            console.log(res)
            
            for (var i in res.data){
              res.data[i].listAdId = i
              
            }
            console.log(res.data)
            that.setData({
              list: res.data,
            })
            wx.hideLoading()
          }
        })
      }
    })
  },
  li: function (options) {
    console.log(options)
    if (options.currentTarget.dataset.a == this.data.listAdId){
      this.setData({
        listAdId: '-1'
      })
      return
    }
    this.data.listAdId = options.currentTarget.dataset.a
    
    this.setData({
      listAdId: this.data.listAdId 
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