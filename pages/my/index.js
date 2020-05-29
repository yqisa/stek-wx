// pages/my/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: "",
    avatar: "",
    userInfo: null,
    palceHolder: "",
    msg: '',
    gongpai: '',
    zhiye_msg: '',
    genghuan: '',
    token:'',
    n:'',
    zhiye_type: '',
    userType: '',
    uploadimg:'',
    // url:'http://192.168.1.82:9000/api/',
    imgbox: [],
    imgsrc: "https://cdmcxq.com/stek/timg1.jpg",
    imgType:'img',
    content:''
  },
  inputing_con: function (options) {
    var that = this;
    console.log(options.detail.value)
    that.data.content = options.detail.value
  },
  inputing_zhiye: function (options) {
    var that = this;
    console.log(options.detail.value)
    that.data.zhiye_msg = options.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.rurl + "wp-json/jwt-auth/v1/token",
      method: "POST",
      data: {
        username: 'carcontribute',
        password: "v$ScKRTLXS*14i2yY9Q7wxcQ"
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data.token)
        that.data.token = res.data.token
      },
      fail(res) {

      }
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
          if (res.data[i].slug == 'al') {
            var n = res.data[i].id
            that.data.n = n
            that.data.category_thumbnail_image = res.data[i].category_thumbnail_image
          }
        }
      }
    })
  },
  saveInfo: function (options) {
    wx.showLoading({
      title: '提交中...',
    })
   var that=this;
        wx.request({
          url: app.globalData.rurl + "wp-json/wp/v2/posts",
          method: "POST",
          data: {
            title: that.data.zhiye_msg,
            content: that.data.content,
            // status: '',
            // category_name: '',
            // featured_media: that.data.uploadimg,
            categories: that.data.n,
          },
          header: {
            'content-type': 'application/json',
            'Authorization': "Bearer " + that.data.token,
            // 'Content-type': multipart / form - data,
            // 'Content - Disposition': form - data; name = file; filename = test.txt,
            // 'Content - Type': "text / plain",
          },
          success(res) {
            console.log(res)
            if (res.statusCode==201){
              wx.showToast({
                title: '提交成功',
              })
            }
            wx.hideLoading()
          },
          fail(res) {
              wx.showToast({
                title: '提交错误',
              })
            wx.hideLoading() 
          }
        })



  },
  addPic1: function (e) {
    var imgbox = this.data.imgbox;
    var that = this;
    var n = 9;
    if (9 > imgbox.length > 0) {
      n = 9 - imgbox.length;
    } else if (imgbox.length == 9) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        var type = res.tempFiles[0].path.substring(res.tempFiles[0].path.length - 4)
        console.log(type)
        if (type == ".mp4" || type == ".avi" || type == "rmvb" || type == ".flv" || type == ".mov" || type == ".mkv"){
          that.setData({
            imgType: 'video',
          });
        }
        if (res.tempFiles[0].size > 1024 * 1024 * 100) {
          wx.showToast({
            title: '文件不能大于100M',
            icon: 'none',
            duration: 2000
          })
          return;
        } 
        wx.showLoading({
          title: '上传中...',
        })
        var tempFilePaths = res.tempFilePaths
        // console.log(qiniuUploader)
        // console.log(qiniuUploader.unload)
        const filepath = res.tempFilePaths[0]
        wx.uploadFile({
          url: app.globalData.rurl + "wp-json/wp/v2/media",
          filePath: filepath,
          name: 'file',
          header: {
            'Authorization': "Bearer " + that.data.token,
          },
          success(res) {
            var data = JSON.parse(res.data)
            that.data.content += "<img src='https://wx.stekautomotive.cn/wp-content/uploads/" + data.media_details.file + "'></img>"            
            console.log(that.data.content)
            that.setData({
              con_msg: that.data.content
            })
            wx.hideLoading()
          },
          fail(res) {

          }
        })
        console.log(filepath)
        if (imgbox.length == 0) {
          imgbox.push(filepath)
        } else {
          imgbox = imgbox.concat(filepath);
        }
          that.setData({
            imgbox: imgbox,
          });
      }
    })
  },
  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
      var imgbox = this.data.imgbox;
      imgbox.splice(index, 1)
      that.setData({
        imgbox: imgbox,
      });
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