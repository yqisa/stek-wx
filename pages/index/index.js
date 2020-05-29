//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    navlist:[],
    m:'',
    n:"",
    array:[],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    src: app.globalData.url+"index.jpg",
    srcnav: app.globalData.url +"nav.jpg",
    opennav:false,
    banner: [app.globalData.url + "banner.jpg"],
    banner1: [app.globalData.url + "cp2.png", app.globalData.url + "cp3.png", app.globalData.url + "cp2.png", app.globalData.url + "cp3.png",]
  },
  opennav: function () {
    if (this.data.opennav==false){
      this.data.opennav=true
      this.setData({
        opennav: true
      })
    }else{
      this.data.opennav = false
      this.setData({
        opennav: false
      })
    }
    
  },
  detail: function (e) {
    wx.navigateTo({
      url: '/pages/al/detail?id=' + e.currentTarget.dataset.a,
    })
  },
  openus: function () {
    wx.navigateTo({
      url: '/pages/my/index',
    })
  },
  cpxl: function () {
    wx.switchTab({
      url: '/pages/pro/index',
    })
  },
  sousuo:function(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/hd/sousuo?name=' + e.detail.value,
    })
  },
  index:function(e){
    console.log(e.currentTarget.dataset.a)
    console.log(e.currentTarget.dataset.b)
    if (e.currentTarget.dataset.a == 'index'){
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
  onLoad: function () {
    var that=this;
    var array=[]
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
        console.log(res)
        that.setData({
          navlist:res.data
        })
        for (var i in res.data) {
          if (res.data[i].slug == 'al') {
            var n = res.data[i].id
            that.data.n = n
          }
          if (res.data[i].slug == 'pro') {
            var m = res.data[i].id
            that.data.m = m
          }
        }
        for (var i in res.data) {
          if (res.data[i].parent == m) {

            array.push(res.data[i])
          }
        }
        that.data.array = array
        that.setData({
          array: that.data.array
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
        wx.hideLoading()
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage:function(){

  },
  onPullDownRefresh: function () {
    this.onload()
  }
})
