// pages/merger/merger.js
const app = getApp()
var util = require('../../utils/util.js');
const db = wx.cloud.database({
  env: "tmassistant-5275ad"
})

// const innerAudioContext = wx.createInnerAudioContext()
const backgroundAudioManager = wx.getBackgroundAudioManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*
      文字无限滚动
    */

    // text: "更多公众演讲和领导力的内容，点击这里;        更多公众演讲和领导力的内容，点击这里;  更多公众演讲和领导力的内容，点击这里;        更多公众演讲和领导力的内容，点击这里;        ",
    text: "更多公众演讲和领导力的内容，点击这里\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t",
    marqueePace: 0.5, //滚动速度
    marqueeDistance: 0, //初始滚动距离
    marquee_margin: 30,
    size: 14,
    interval: 20, // 时间间隔

    texts: ["头马世界冠军教你四招搞定公众演讲", "必学！头马演讲达人给你的五条演讲建议"],
    page_ft: {
      data: "Copyright © 2019-2020 可能性工作室"
    },
    isplay: false,
    audioYear: 2018,
    banners: [
      //{
      //   "url": "cloud://tmassistant-5275ad.746d-tmassistant-5275ad/images/accountpublicitybanner.jpeg",
      //   "bind": "saveOfficialQRCode"
      // },
      {
        "url": "../../images/tm_korea-min.jpg",
        "bind": "saveOfficialQRCode"
      },
      {
        "url": "../../images/dashangzhichi_banner-min.jpeg",
        "bind": "gotoGeizan"
      }
      // {
      //   "url": "cloud://tmassistant-5275ad.746d-tmassistant-5275ad/images/TEDtalk2.jpeg",
      //   "bind": "saveOfficialQRCode"
      // }
      // {
      //   "url": "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/images/bilingualSpeak.jpeg?sign=559732267d212043dba93a6e0023d99f&t=1565749963",
      //   "bind": "toBilingualSpeak"
      // }
    ],
    banner_height: 50,
    scrollTop: 0,
    threshold: 1300,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    userId: app.globalData.userInfo,
    topics: [
      {
        "title": "真人秀",
        "id": "06f09e83-ede9-4de1-8fb5-c2ea5a0d7215"
      }, 
      {
        "title": "困境",
        "id": "2d5ccb4f-e90f-4ec6-9118-0697e366117b"
      }, 
      {
        "title": "假如",
        "id": "EUO7d4DhyO4kGeyLxgUfJmNOgFNBPJNmkXlDT8Vdm5KNUk3M"
      }, 
      {
        "title": "高考",
        "id": "b9fb62e7-2a49-4e66-bc10-71cb6dcd03a2"
      }
    ]
  },

  onPageScroll: function(ev) {
    this.setData({
      scrollTop: ev.scrollTop
    })
  },

  audioManage: function(options) {
    console.log(options.currentTarget.id)
    if (options.currentTarget.id == "continue") {
      backgroundAudioManager.play()
      this.setData({
        isplay: true,
      })
    } else if (options.currentTarget.id == "stop") {
      backgroundAudioManager.stop()
      this.setData({
        isplay: false
      })
    }
  },

  // getAudio: function(options) {
  //   console.log(options.detail.formId)

  //   var timestamp = Date.parse(new Date()) / 1000
  //   var newtimestamp = timestamp + 24 * 60 * 60 * 7
  //   var n7_to = newtimestamp * 1000

  //   db.collection("formIds").add({
  //     data: {
  //       openid: this.data.openid,
  //       formId: options.detail.formId,
  //       expire: new Date(n7_to),
  //       available: true
  //     }
  //   })

  //   if (options.detail.target.id == "more") {
  //     wx.navigateTo({
  //       url: '/pages/audio/audio',
  //     })
  //     return
  //   }

  //   var that = this
  //   // 对同一个音频进行操作
  //   if (options.detail.target.id == this.data.audioYear) {
  //     if (this.data.isplay) { // 正在播放，终止
  //       console.log("stop")
  //       backgroundAudioManager.stop()
  //     } else { // 未在播放，开始播放
  //       console.log("play")

  //       backgroundAudioManager.title = this.data.audioYear + '演讲音频 by 头马助手'
  //       backgroundAudioManager.epname = '头马助手'
  //       backgroundAudioManager.singer = '头马助手'
  //       backgroundAudioManager.coverImgUrl = ''
  //       // 设置了 src 之后会自动播放
  //       backgroundAudioManager.src = this.data.audiosrc.filter(function(x) {
  //         return x["year"] == that.data.audioYear
  //       })[0]['link']
  //     }
  //     this.setData({
  //       isplay: !this.data.isplay
  //     })
  //   } else { // 不是对同一个音频进行操作
  //     // 本来就有音频在进行
  //     if (this.data.isplay) {
  //       // innerAudioContext.stop()
  //       backgroundAudioManager.stop()
  //       this.setData({
  //         audioYear: options.detail.target.id
  //       })

  //       backgroundAudioManager.title = this.data.audioYear + '演讲音频 by 头马助手'
  //       backgroundAudioManager.epname = '头马助手'
  //       backgroundAudioManager.singer = '头马助手'
  //       backgroundAudioManager.coverImgUrl = ''
  //       // 设置了 src 之后会自动播放
  //       backgroundAudioManager.src = this.data.audiosrc.filter(function(x) {
  //         return x["year"] == that.data.audioYear
  //       })[0]['link']
  //     } else { // 没有音频在进行
  //       this.setData({
  //         isplay: true,
  //         //isplay: !this.data.isplay,
  //         audioYear: options.detail.target.id
  //       })

  //       backgroundAudioManager.title = this.data.audioYear + '演讲音频 by 头马助手'
  //       backgroundAudioManager.epname = '头马助手'
  //       backgroundAudioManager.singer = '头马助手'
  //       backgroundAudioManager.coverImgUrl = ''
  //       // 设置了 src 之后会自动播放
  //       backgroundAudioManager.src = this.data.audiosrc.filter(function(x) {
  //         return x["year"] == that.data.audioYear
  //       })[0]['link']
  //     }
  //   }

  //   console.log(this.data.isplay)
  //   console.log(this.data.audioYear)

  //   console.log(options.detail.target.id)
  // },

  playTEDaudio: function(e) {
    console.log("TED audio")
  },

  // playAudio: function(e) {
  //   // 对同一个音频进行操作
  //   if (e.currentTarget.dataset.year == this.data.audioYear) {
  //     if (this.data.isplay) { // 正在播放，终止
  //       console.log("stop")
  //       backgroundAudioManager.stop()
  //     } else { // 未在播放，开始播放
  //       console.log("play")

  //       backgroundAudioManager.title = this.data.audioYear + '演讲音频 by 头马助手'
  //       backgroundAudioManager.epname = '头马助手'
  //       backgroundAudioManager.singer = '头马助手'
  //       backgroundAudioManager.coverImgUrl = ''
  //       // 设置了 src 之后会自动播放
  //       backgroundAudioManager.src = this.data.audioTEDsrc[this.data.audioYear]['link']
  //     }
  //     this.setData({
  //       isplay: !this.data.isplay
  //     })
  //   } else { // 不是对同一个音频进行操作
  //     // 本来就有音频在进行
  //     if (this.data.isplay) {
  //       backgroundAudioManager.stop()
  //       this.setData({
  //         audioYear: e.currentTarget.dataset.year
  //       })

  //       backgroundAudioManager.title = this.data.audioYear + '演讲音频 by 头马助手'
  //       backgroundAudioManager.epname = '头马助手'
  //       backgroundAudioManager.singer = '头马助手'
  //       backgroundAudioManager.coverImgUrl = ''
  //       // 设置了 src 之后会自动播放
  //       backgroundAudioManager.src = this.data.audioTEDsrc[this.data.audioYear]['link']
  //     } else { // 没有音频在进行
  //       this.setData({
  //         isplay: true,
  //         audioYear: e.currentTarget.dataset.year
  //       })

  //       backgroundAudioManager.title = this.data.audioYear + '演讲音频 by 头马助手'
  //       backgroundAudioManager.epname = '头马助手'
  //       backgroundAudioManager.singer = '头马助手'
  //       backgroundAudioManager.coverImgUrl = ''
  //       // 设置了 src 之后会自动播放
  //       backgroundAudioManager.src = this.data.audioTEDsrc[this.data.audioYear]['link']
  //     }
  //   }

  //   console.log(this.data.isplay)
  //   console.log(this.data.audioYear)
  // },

  getIntro: function(options) {
    var that = this
    console.log(options.detail.formId)

    var timestamp = Date.parse(new Date()) / 1000
    var newtimestamp = timestamp + 24 * 60 * 60 * 7
    var n7_to = newtimestamp * 1000

    db.collection("formIds").add({
      data: {
        openid: this.data.openid,
        formId: options.detail.formId,
        expire: new Date(n7_to),
        available: true
      }
    })

    console.log(options.detail.target.id)

    if (options.detail.target.id == "") {
      return
    }

    if (options.detail.target.id == "intro") {
      wx.switchTab({
        url: '/pages/volItem/volItem',
      })
    } else if (options.detail.target.id == "guess") {
      // this.pageScrollToBottom()
      wx.navigateTo({
        url: '/pages/reading/reading',
      })
    } else if (options.detail.target.id == "myintro") {
      wx.switchTab({
        url: '/pages/reading/reading',
      })
      // wx.navigateTo({
      //   url: '/pages/reading/reading',
      // })
    } else if (options.detail.target.id == "roles") {
      this.pageScrollToBottom()
    } else if (options.detail.target.id == "DTM") {
      wx.navigateTo({
        url: '/pages/webview/webview?article=DTM',
      })
    } else if (options.detail.target.id == "checkin") {
      this.checkin()
    } else if (options.detail.target.id == "audio_6min") {
      wx.navigateTo({
        url: '/pages/audio/audio?type=6min',
      })
    } else if (options.detail.target.id == "audio_ted") {
      wx.navigateTo({
        url: '/pages/audio/audio?type=ted',
      })
    } else if (options.detail.target.id == "audio_tm") {
      wx.navigateTo({
        url: '/pages/audio/audio?type=tm',
      })
    } else if (options.detail.target.id == "tmIntro") {
      wx.switchTab({
        url: '/pages/volItem/volItem',
      })
    } else if (options.detail.target.id == "linkAccount") {
      wx.navigateTo({
        url: '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/fHPAB2m3a7iFeYsTDFpkXA',
      })
    } else if (options.detail.target.id == "value") {
      wx.navigateTo({
        url: '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/Gxe8j_cnzpNk5glPr7O93A',
      })
    } else if (options.detail.target.id == "jixing") {
      wx.navigateToMiniProgram({
        appId: 'wx4c4b54bc609bd79e',
        path: 'pages/volItem/volItem'
      })
    } else if (options.detail.target.id == "jixingku") {
      wx.navigateToMiniProgram({
        appId: 'wx4c4b54bc609bd79e',
        path: 'pages/knowledge/knowledge'
      })
    } else if (options.detail.target.id == "topics") {
      wx.navigateToMiniProgram({
        appId: 'wx4c4b54bc609bd79e',
        path: 'pages/index/index?challenge=true'
      })
    } else if (options.detail.target.id == "timertool"){
      wx.navigateTo({
        url: '/pages/tm/clock/countdown/countdown',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (options.detail.target.id == "matrix") {
      wx.navigateTo({
        url: '/pages/knowledge/matrix/matrix',
      })
    }else if (options.detail.target.id == "todayaudio") {
      wx.showModal({
        content: "\"今日听力\"\n每天精选BBC Learning English 6分钟英语音频。\n适合初中级英语学习者锻炼听力，学习地道表达，以及扩充知识面。\n建议第一遍泛听，第二遍开始精听，至少听三遍以上。",
        showCancel: true,
        cancelText: '音频库',
        cancelColor: '#008B45',
        confirmText: '今日听力',
        confirmColor: '#ff7f50',
        success: function(res) {
          if (res.confirm) {
            if (that.data.todayaudio[0]['text']) {
              wx.navigateTo({
                url: '/pages/music/music?audio=' + that.data.todayaudio[0]["link"] + '&title=' + that.data.todayaudio[0]["title"] + "&todaysaudio=yes&text=https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/" + that.data.todayaudio[0]['text'],
              })
            } else {
              wx.navigateTo({
                url: '/pages/music/music?audio=' + that.data.todayaudio[0]["link"] + '&title=' + that.data.todayaudio[0]["title"] + "&todaysaudio=yes",
              })
            }
          } else {
            wx.navigateTo({
              url: '/pages/audio/audio',
            })
          }
        },
        fail: function(res) {
          console.log(res)
        }
      })
    } else {
      var naviTo = '/pages/pathways/desc/desc?level=' + options.detail.target.id

      wx.navigateTo({
        url: naviTo,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },

  leveldesc: function(options) {
    wx.navigateTo({
      url: '/pages/webview/webview?article=membership',
    })
  },

  getPathways: function(options) {
    wx.navigateTo({
      url: '/pages/pathways/desc/desc?level=' + options.currentTarget.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  gotoGeizan: function(options) {
    // wx.navigateToMiniProgram({
    //   appId: 'wx18a2ac992306a5a4',
    //   path: 'pages/apps/largess/detail?id=LYFYxTFDv9E%3D'
    // })
    wx.previewImage({
      current: 'cloud://tmassistant-5275ad.746d-tmassistant-5275ad-1258071577/images/zanshang-min.jpeg', // 当前显示图片的http链接
      urls: ["cloud://tmassistant-5275ad.746d-tmassistant-5275ad-1258071577/images/zanshang-min.jpeg"] // 需要预览的图片http链接列表
    })
  },

  getToNavi: function(options) {
    console.log(options)

    var naviTo = '/pages/webview/webview?article=' + options.currentTarget.id

    wx.navigateTo({
      url: naviTo,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  navigateTo: function(options) {
    wx.navigateTo({
      url: options.currentTarget.id
    })
  },

  navigateToHequn: function() {
    wx.navigateToMiniProgram({
      appId: 'wx018f0c4c2a1ee727',
      path: 'pages/group-detail/index?groupid=16287827559774652520'
    })
  },

  getRoles: function(options) {
    console.log(options.detail.formId)

    var timestamp = Date.parse(new Date()) / 1000
    var newtimestamp = timestamp + 24 * 60 * 60 * 7
    var n7_to = newtimestamp * 1000

    db.collection("formIds").add({
      data: {
        openid: this.data.openid,
        formId: options.detail.formId,
        expire: new Date(n7_to),
        available: true
      }
    })

    var naviTo = '/pages/webview/webview?article=' + options.detail.target.id

    if (options.detail.target.id == "timer") {
      naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/8qZ35ufgvfU9Vofey9cpoA'
    } else if (options.detail.target.id == "grammarian") {
      naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/CgAhMmeHUhzk7ggP3bZjXQ'
    } else if (options.detail.target.id == "ahcounter") {
      naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/Dgxafy9C2VbD7-zof0d6CA'
    } else if (options.detail.target.id == "tm") {
      naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/kO0vAauBvhBpe2R_H6cx9g'
    } else if (options.detail.target.id == "ttm") {
      naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/OCA3gVYNrwoYGKzlhBS_dw'
    } else if (options.detail.target.id == "ge") {
      naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/iNsBSDOgzdGRuUZBAPj5NA'
    } else if (options.detail.target.id == "ie") {
      naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/02os_4WjmHkPqg6_jjC1KA'
    } else if (options.detail.target.id == "tte") {
      naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/mn1_Sexe6RxEDoHWxKKFJw'
    } else if (options.detail.target.id == "SAA1") {
      naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/02os_4WjmHkPqg6_jjC1KA'
    }

    wx.navigateTo({
      url: naviTo,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  getTool: function(options) {
    var timestamp = Date.parse(new Date()) / 1000
    var newtimestamp = timestamp + 24 * 60 * 60 * 7
    var n7_to = newtimestamp * 1000

    db.collection("formIds").add({
      data: {
        openid: this.data.openid,
        formId: options.detail.formId,
        expire: new Date(n7_to),
        available: true
      }
    })

    if (options.detail.target.id == "timertool") {
      wx.navigateTo({
        url: '/pages/tm/clock/countdown/countdown',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else if (options.detail.target.id == "matrix") {
      wx.navigateTo({
        url: '/pages/knowledge/matrix/matrix',
      })
    } else if (options.detail.target.id == "jixing") {
      wx.navigateToMiniProgram({
        appId: 'wx4c4b54bc609bd79e',
      })
    } else if (options.detail.target.id == "translator") {
      wx.navigateTo({
        url: '/pages/translator/translator',
      })
    } else if (options.detail.target.id == "check") {
      wx.navigateTo({
        url: '/pages/tools/checklist/checklist',
      })
    }
  },

  getArticle: function(options) {
    console.log(options.detail.formId)

    var timestamp = Date.parse(new Date()) / 1000
    var newtimestamp = timestamp + 24 * 60 * 60 * 7
    var n7_to = newtimestamp * 1000

    db.collection("formIds").add({
      data: {
        openid: this.data.openid,
        formId: options.detail.formId,
        expire: new Date(n7_to),
        available: true
      }
    })

    if (options.detail.target.id == "toumazhushou") {
      wx.navigateTo({
        url: '/pages/webview/webview?article=toumazhushou',
      })
    } else if (options.detail.target.id == "contact") {
      wx.navigateTo({
        url: '/pages/contact/contact',
      })
    } else if (options.detail.target.id == "dashang") {
      util.dashang()
    }
  },

  dashang: function(e) {
    util.dashang()
  },

  toBilingualSpeak: function(e) {
    wx.navigateToMiniProgram({
      appId: 'wx4c4b54bc609bd79e'
    })
  },

  saveOfficialQRCode: function(e) {
    wx.showModal({
      content: '搜索"头马演讲助手"官方公众号, 获取历年头马世界冠军演讲视频！',
      showCancel: false,
      confirmText: '去关注',
      confirmColor: '#ff7f50',
      success: function(res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: "头马演讲助手",
            success: function(res) {
              wx.showToast({
                title: "公众号名已复制"
              })
            }
          })
          console.log('用户点击确定');
        }
      }
    })
  },

  tmIntro: function(options) {

  },

  checkin: function(options) {
    var that = this

    db.collection("checkin").where({
      date: util.formatTime(new Date())
    }).count({
      success: function(res) {
        console.log(res.total)
        that.setData({
          checkin_today_total: res.total
        })
        wx.cloud.callFunction({
          name: "getOpenid",
          success: res => {
            that.setData({
              openId: res.result.openid
            })
            var openid = res.result.openid
            db.collection("checkin").where({
              openid: res.result.openid
            }).get({
              success: function(res) {
                console.log(res.data)
                //之前从来没有签到过
                if (res.data.length == 0) {
                  db.collection('checkin').add({
                    data: ({
                      checkin: 1,
                      date: util.formatTime(new Date()),
                      openid: openid,
                      created_at: util.formatTime(new Date())
                    }),
                    success: function() {
                      wx.showModal({
                        content: "恭喜你发现了隐藏签到处！更多惊喜正在路上，明天继续来签到吧！今日积分: +10 ",
                        showCancel: false,
                        // confirmText: '',
                        confirmColor: '#ff7f50',
                        success: function(res) {
                          if (res.confirm) {}
                        }
                      })
                    }
                  })
                } else {
                  if (res.data[0].date == util.formatTime(new Date())) {
                    //今天已经签到过
                    wx.showModal({
                      content: "今天已打卡, 你已经打卡过" + res.data[0].checkin + "次, 明天再来打卡~\n今日积分10已加\n今天已经有" + that.data.checkin_today_total + "人打卡了~",
                      showCancel: false,
                      // cancelText: '今日听力',
                      // cancelColor: '#008B45',
                      // confirmText: '',
                      confirmColor: '#ff7f50',
                      success: function(res) {
                        if (res.confirm) {
                          console.log("confirm")
                        } else {
                          console.log(that.data.todayaudio[0]['text'])
                          wx.navigateTo({
                            url: '/pages/music/music?audio=' + that.data.todayaudio[0]["link"] + '&title=' + that.data.todayaudio[0]["title"] + "&todaysaudio=yes&text=https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/" + that.data.todayaudio[0]['text'],
                          })
                          that.setData({
                            isplay: true
                          })
                        }
                      },
                      fail: function(res) {
                        console.log(res)
                      }
                    })
                  } else {
                    //今天第一次签到
                    db.collection('checkin').doc(res.data[0]._id).update({
                      data: {
                        checkin: db.command.inc(1),
                        date: util.formatTime(new Date())
                      },
                      success: res1 => {
                        wx.showModal({
                          content: "打卡成功！这是你的第" + (res.data[0].checkin + 1) + "次打卡, 今日积分: +10 || 你是今天第" + (that.data.checkin_today_total + 1) + "位打卡者~",
                          showCancel: false,
                          // cancelText: '今日听力',
                          // cancelColor: '#008B45',
                          // confirmText: '',
                          confirmColor: '#ff7f50',
                          success: function(res) {
                            if (res.confirm) {
                              console.log("confirm")
                            } else {
                              console.log(that.data.todayaudio[0]['text'])
                              wx.navigateTo({
                                url: '/pages/music/music?audio=' + that.data.todayaudio[0]["link"] + '&title=' + that.data.todayaudio[0]["title"] + "&todaysaudio=yes&text=https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/" + that.data.todayaudio[0]['text'],
                              })
                              that.setData({
                                isplay: true
                              })
                            }
                          }
                        })
                      }
                    })
                  }
                } //数据库已经有对应人的信息
              },
              fail: function(e) {
                console.log("fail")
              }
            })
          }
        })
      }
    })
  },

  // 获取容器高度，使页面滚动到容器底部
  pageScrollToBottom: function() {
    wx.createSelectorQuery().select('#juese').boundingClientRect(
      function(rect) {
        // 使页面滚动到底部
        console.log(rect)
        wx.pageScrollTo({
          scrollTop: rect.top
        })
      }
    ).exec()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // wx.getNetworkType({
    //   success(res) {
    //     const networkType = res.networkType
    //     console.log(res.networkType)
    //   }
    // })

    var that = this
    this.setData({
      banner_height: 220 / wx.getSystemInfoSync().windowHeight * 110
    })

    if (options.roles) {
      this.pageScrollToBottom()
    }

    db.collection("audio").where({
      onIndex: true
    }).get({
      success: function(e) {
        console.log(e)
        that.setData({
          todayaudio: e.data
        })
        db.collection("guessYouLike").where({
          onIndex: true
        }).get({
          success: function(e) {
            console.log(e)
            that.setData({
              guessYouLike: e.data.reverse()
            })
            db.collection("information").where({
              type: "topics"
            }).get({
              success: function(e) {
                console.log(e.data[0].topics)
                that.setData({
                  topics: e.data[0].topics
                })
                wx.cloud.callFunction({
                  name: "getOpenid",
                  success: res => {
                    that.setData({
                      openId: res.result.openid
                    })
                    var openid = res.result.openid
                    db.collection("checkin").where({
                      openid: res.result.openid
                    }).get({
                      success: function (res) {
                        console.log(res.data)
                        if (res.data.length == 0) {
                          that.setData({
                            level: "青铜"
                          })
                        } else {
                          var level_set = "布衣"
                          var score = res.data[0].checkin * 10
                          if (score < 100) { } else if (score < 200) {
                            level_set = "黑铁"
                          } else if (score < 400) {
                            level_set = "青铜"
                          } else if (score < 600) {
                            level_set = "白银"
                          } else if (score < 800) {
                            level_set = "黄金"
                          } else if (score < 1000) {
                            level_set = "铂金"
                          } else if (score < 2000) {
                            level_set = "钻石"
                          } else if (score < 4000) {
                            level_set = "闪烁"
                          } else {
                            console.log("不在范围内")
                          }
                          that.setData({
                            level: level_set
                          })
                        }
                      }
                    })
                  }
                })
              }
            })
          }
        })

        // wx.cloud.callFunction({
        //   name: "getOpenid",
        //   success: res => {
        //     that.setData({
        //       openId: res.result.openid
        //     })
        //     var openid = res.result.openid
        //     db.collection("checkin").where({
        //       openid: res.result.openid
        //     }).get({
        //       success: function(res) {
        //         console.log(res.data)
        //         if (res.data.length == 0) {
        //           that.setData({
        //             level: "青铜"
        //           })
        //         } else {
        //           var level_set = "布衣"
        //           var score = res.data[0].checkin * 10
        //           if (score < 100) {} else if (score < 200) {
        //             level_set = "黑铁"
        //           } else if (score < 400) {
        //             level_set = "青铜"
        //           } else if (score < 600) {
        //             level_set = "白银"
        //           } else if (score < 800) {
        //             level_set = "黄金"
        //           } else if (score < 1000) {
        //             level_set = "铂金"
        //           } else if (score < 2000) {
        //             level_set = "钻石"
        //           } else if (score < 4000) {
        //             level_set = "闪烁"
        //           } else {
        //             console.log("不在范围内")
        //           }
        //           that.setData({
        //             level: level_set
        //           })
        //         }
        //       }
        //     })
        //   }
        // })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    wx.getBackgroundAudioPlayerState({
      success(res) {
        if (res.status == 1) {
          that.setData({
            isplay: true
          })
        } else {
          that.setData({
            isplay: false
          })
        }
      }
    })

    var length = that.data.text.length * that.data.size; //文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth; // 屏幕宽度
    //console.log(length,windowWidth);
    that.setData({
      length: length,
      windowWidth: windowWidth
    });
    that.scrolltxt(); // 第一个字消失后立即从右边出现
  },

  scrolltxt: function() {
    var that = this;
    var length = that.data.length; //滚动文字的宽度
    var windowWidth = that.data.windowWidth; //屏幕宽度
    if (length > windowWidth) {
      var interval = setInterval(function() {
        var maxscrollwidth = length + that.data.marquee_margin; //滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可
        var crentleft = that.data.marqueeDistance;
        if (crentleft < maxscrollwidth) { //判断是否滚动到最大宽度
          that.setData({
            marqueeDistance: crentleft + that.data.marqueePace
          })
        } else {
          //console.log("替换");
          that.setData({
            marqueeDistance: 0 // 直接重新滚动
          });
          clearInterval(interval);
          that.scrolltxt();
        }
      }, that.data.interval);
    } else {
      that.setData({
        marquee_margin: "1000"
      }); //只显示一条不滚动右边间距加大，防止重复显示
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  onShareAppMessage: function(res) {
    return {
      title: '头马助手, 专注中英文双语演讲, 3万名终身学习者的选择',
      imageUrl: '/images/indexforward-min.jpg'
    }
  }
})