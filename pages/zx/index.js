// pages/zx/index.js
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
    banner: app.globalData.url + "zx1.jpg",
    page:1,
    maxsize:99,
    category_thumbnail_image: '',
    n: ''
  },
  detail: function (e) {
    wx.navigateTo({
      url: '/pages/al/detail?id=' + e.currentTarget.dataset.a,
    })
  },
  zxdetail: function (e) {
    console.log(4141)
    wx.navigateTo({
      url: '/pages/zx/detail',
    })
  },
  next: function (e) {
    this.data.page = this.data.page + 1
    this.setData({
      page: this.data.page
    })
    this.load()
  },
  last: function (e) {
    if (this.data.page > 1) {
      this.data.page = this.data.page - 1
      this.setData({
        page: this.data.page
      })
      this.load()
    } else if (this.data.page == 1) {
      wx.showToast({
        title: '已经是第一页了',
        duration: 2000
      })
      this.setData({
        page: this.data.page
      })
      return
    }
  },
  load: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    wx.request({
      url: app.globalData.rurl + "wp-json/wp/v2/posts/?categories=" + that.data.n + '&page=' + that.data.page,
      method: "GET",
      data: {

      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        if (res.statusCode==400 && res.data.data.status == 400) {
          wx.showToast({
            title: '没有更多了',
            duration: 2000
          })
          this.data.page = this.data.page - 1
          this.setData({
            page: this.data.page
          })
        }else{
          // console.log(525)
          that.setData({
            list: res.data,
          })
        }
        wx.hideLoading()
      },
      fail(res) {

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
          if (res.data[i].slug == 'zx') {
            n = res.data[i].id
            that.data.n = n
            that.data.category_thumbnail_image = res.data[i].category_thumbnail_image
          }
        }
        that.setData({
          category_thumbnail_image: that.data.category_thumbnail_image,
        })

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
            that.setData({
              list: res.data,
            })
            wx.hideLoading()
          }
        })
      }
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