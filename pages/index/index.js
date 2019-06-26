//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    teachers: [
      { name: "张三", flag: false },
      { name: "李四", flag: false },
      { name: "王五", flag: false },
      { name: "马超", flag: false },
      { name: "刘备", flag: false },
      { name: "吕蒙", flag: false },
      { name: "张机", flag: false },
      { name: "关银屏", flag: false },
      { name: "诸葛连弩", flag: false }
      ],
      selectSum: 0,
      maxSelectSum: 5
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
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
  test: function(e){
    if(!this.data.teachers[e.target.id].flag && this.data.selectSum == this.data.maxSelectSum){
      return;
    }
    let teacherFlag = "teachers[" + e.target.id + "].flag";
    this.setData({
      [teacherFlag] : !this.data.teachers[e.target.id].flag
    })
    let selectSum = this.data.selectSum;
    if(this.data.teachers[e.target.id].flag){
      this.setData({
        selectSum : selectSum + 1
      })
    }else{
      this.setData({
        selectSum: selectSum - 1
      })
    }
  }
})
