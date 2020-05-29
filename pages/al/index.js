// pages/al/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: app.globalData.url + "al1.jpg",
    opennav: false,
    srcnav: app.globalData.url + "nav.jpg",
    page: 1,
    maxsize: 99,
    fm: "",
    array: [

    ],
    n: '',
    index: 0
  },
  opennav: function () {
    if (this.data.opennav == false) {
      this.data.opennav = true
      this.setData({
        opennav: true
      })
    } else {
      this.data.opennav = false
      this.setData({
        opennav: false
      })
    }

  },
  detail:function(e){
    wx.navigateTo({
      url: '/pages/al/detail?id=' + e.currentTarget.dataset.a,
    }) 
  },
  openus: function () {
    wx.navigateTo({
      url: '/pages/my/index',
    })
  },
  index: function (e) {
    console.log(e.currentTarget.dataset.a)
    console.log(e.currentTarget.dataset.b)
    if (e.currentTarget.dataset.a == 'index') {
      wx.switchTab({
        url: '/pages/index/index?page=' + e.currentTarget.dataset.b,
      })
    }
    if (e.currentTarget.dataset.a == 'pro') {
      wx.switchTab({
        url: '/pages/pro/index?page=' + e.currentTarget.dataset.b,
      })
    }
    if (e.currentTarget.dataset.a == 'al') {
      wx.switchTab({
        url: '/pages/al/index?page=' + e.currentTarget.dataset.b,
      })
    }
    if (e.currentTarget.dataset.a == 'pp') {
      wx.navigateTo({
        url: '/pages/pp/index?page=' + e.currentTarget.dataset.b,
      })
    }
    if (e.currentTarget.dataset.a == 'hd') {
      wx.navigateTo({
        url: '/pages/hd/index?page=' + e.currentTarget.dataset.b,
      })
    }
    if (e.currentTarget.dataset.a == 'us') {
      wx.navigateTo({
        url: '/pages/us/index?page=' + e.currentTarget.dataset.b,
      })
    }
    if (e.currentTarget.dataset.a == 'zx') {
      wx.navigateTo({
        url: '/pages/zx/index?page=' + e.currentTarget.dataset.b,
      })
    }
  },
  pro: function () {
    wx.switchTab({
      url: '/pages/pro/index',
    })
  },
  al: function () {
    wx.switchTab({
      url: '/pages/al/index',
    })
  },
  pp: function () {
    wx.navigateTo({
      url: '/pages/pp/index',
    })
  },
  hd: function () {
    wx.navigateTo({
      url: '/pages/hd/index',
    })
  },
  us: function () {
    wx.navigateTo({
      url: '/pages/us/index',
    })
  },
  zx: function () {
    wx.navigateTo({
      url: '/pages/zx/index',
    })
  },
  aldetail: function (e) {
    console.log(4141)
    wx.navigateTo({
      url: '/pages/al/detail',
    })
  },
  bindPickerChange: function (e) {
    this.data.index = e.detail.value
    console.log(e)
    this.setData({
      index: e.detail.value
    })
    // this.load()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  load:function(options) {
    wx.showLoading({
      title: '加载中...',
    })
    var that=this
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
        if (res.statusCode==400){
          wx.showToast({
            title: '没有更多了',
            duration: 2000
          })  
          this.data.page = this.data.page - 1
          this.setData({
            page: this.data.page
          })
        }else{
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
        per_page:50
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
          if (res.data[i].slug == 'al') {
            n = res.data[i].id
            that.data.n = n
            that.data.category_thumbnail_image = res.data[i].category_thumbnail_image
          }
        }

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
            that.setData({
              list: res.data,
            })
            wx.hideLoading()
          }
        })
        // wx.request({
        //   url: app.globalData.rurl + "wp-json/wp/v2/pages/?posts=" + that.data.n,
        //   method: "GET",
        //   data: {

        //   },
        //   header: {
        //     'content-type': 'application/json'
        //   },
        //   success(res) {
        //     console.log(res)
        //     wx.hideLoading()
        //   }
        // })
        // wx.request({
        //   url: app.globalData.rurl + "wp-json/wp/v2/posts/129",
        //   method: "GET",
        //   data: {

        //   }, 
        //   header: {
        //     'content-type': 'application/json'
        //   },
        //   success(res) {
        //     console.log(res)
        //     wx.hideLoading()
        //   }
        // })
      }
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
    } else if (this.data.page == 1){
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