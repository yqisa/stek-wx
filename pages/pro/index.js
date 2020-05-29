// pages/pro/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: app.globalData.url + "cp1.jpg",
    fm:"",
    array:[
      
    ],
    arrayid: [

    ],
    n:'',
    index:0
  },
    prodetail: function (e) {
      wx.navigateTo({
        url: '/pages/al/detail?id=' + e.currentTarget.dataset.a,
      })
    },
  li: function (e) {

console.log(e)
    // this.data.index = e.currentTarget.dataset.a

    // this.setData({
    //   index: this.data.index
    // })
  },
  bindPickerChange: function (e) {
    this.data.index = e.detail.value
    console.log(e)
    this.setData({
      index: e.detail.value,
      list: []
    })
    this.load()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  load: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.rurl + "wp-json/wp/v2/posts/?categories=" + that.data.arrayid[that.data.index],
      method: "GET",
      data: {

      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          list: res.data,
        })
        console.log(res)
        wx.hideLoading()
      }
    })
  },
  onLoad: function (options) {
    var that=this;
    var n='';
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
        var array=[]
        var arrayid = []
        console.log(res)
        for (var i in res.data){
          if (res.data[i].slug=='pro'){
            n = res.data[i].id
            that.data.n = n
            that.data.category_thumbnail_image = res.data[i].category_thumbnail_image
             }
        }
        for (var i in res.data) {
          if (res.data[i].parent == n) {
          
            array.push(res.data[i].name)
            arrayid.push(res.data[i].id)
          }
        }
        that.data.array = array
        that.data.arrayid = arrayid
        that.data.a = that.data.arrayid[0]
        console.log(that.data.arrayid)
        that.setData({
          fm: that.data.category_thumbnail_image,
          array: that.data.array
        })

        wx.request({
          url: app.globalData.rurl + "wp-json/wp/v2/posts/?categories=" + that.data.a,
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
  }
  ,
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