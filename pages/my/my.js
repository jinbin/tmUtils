// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appId: "wx8abaf00ee8c3202e",
    tt_appId: "wx4c4b54bc609bd79e",
    page_ft: {
      data: "Copyright © 2018-2019 jinbin"
    },
    extraData: {
      id: "43654",
      // 自定义参数，具体参考文档
      customData: {
        clientInfo: '',
        imei: ''
      }
    },
    components: [
      // {
      //   title: '关于头马助手',
      //   remark: '关于头马助手',
      //   url: '/pages/index/index',
      // },
      {
        title: '认识作者',
        remark: '认识作者',
        url: '/pages/contact/contact',
      },
      {
        title: '关于头马助手',
        remark: '关于头马助手',
        url: '/pages/webview/webview?article=toumazhushou'
      },
      // {
      //   title: '功能介绍',
      //   remark: '功能介绍',
      //   url: '/pages/pathways/document/document?url=https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/头马助手Toastmasters Assistant.pdf'
      // },
      {
        title: '更新记录',
        remark: '更新记录',
        url: '/pages/article/article?id=updates',
      },
      // {
      //   title: '问卷调查',
      //   remark: '问卷调查',
      //   url: "/pages/gd-component/gd-component?id=1",
      // },
      // {
      //   title: '建议与反馈',
      //   remark: '打赏开发者',
      //   url: '/pages/reward/reward',
      // },
    ]
  },

  onShow: function (options) {

    wx.cloud.callFunction({
      name: "isOwner",
      complete: owner_res => {
        wx.cloud.callFunction({
          name: 'getOpenid',
          complete: res => {
            //牛逼哄哄的作者openid
            for (var index in owner_res.result.data.owners) {
              if (res.result.openid == owner_res.result.data.owners[index]){
                this.setData({
                  isOwner: true
                })
              }
            }
          }
        })
      }
    })

    ///isLogin
    // var that = this
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       console.log("true")
    //       that.setData({
    //         isLogin: "已登录"
    //       })
    //     } else {
    //       console.log("false")
    //       that.setData({
    //         isLogin: "登录了解更多"
    //       })
    //     }
    //   }
    // })
  },

  login: function(e) {
    var that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log("true")
          that.setData({
            isLogin: "已登录"
          })
        } else {
          console.log("false")
          that.setData({
            isLogin: "登录了解更多"
          })
        }
      }
    })
  },

  bindGetUserInfo: function (e) {
    var that = this
    if (e.detail.userInfo) {
      //用户按了允许按钮
      that.setData({
        isLogin: "已登录"
      })
    } else {
      //用户按了拒绝按钮
      that.setData({
        isLogin: "登录了解更多"
      })
    }
  },

  toMiniProgram: function (e) {
    console.log("toMiniProgram")
    wx.navigateToMiniProgram({
      appId: 'wx09a49d05a365a4e6',
      path: "pages/contact/contact",
      // envVersion: 'trial',
      success(res) {
        console.log("SUCCESS")
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  fromPageFt: function () {
    wx.navigateTo({
      url: '/pages/contact/contact',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})
