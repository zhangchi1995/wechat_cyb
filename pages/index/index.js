//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    teachers: [
      { name: "张三", flag: false , isDisplay: true, department: "基础教研室"},
      { name: "李四", flag: false, isDisplay: true, department: "基础教研室"},
      { name: "王五", flag: false, isDisplay: true, department: "实验室"},
      { name: "马超", flag: false, isDisplay: true, department: "网络教研室"},
      { name: "刘备", flag: false, isDisplay: true, department: "网络教研室"},
      { name: "吕蒙", flag: false, isDisplay: true, department: "信管教研室"},
      { name: "张机", flag: false, isDisplay: true, department: "信管教研室"},
      { name: "关银屏", flag: false, isDisplay: true, department: "计应教研室"},
      { name: "诸葛连弩", flag: false, isDisplay: true, department: "计应教研室" },
      { name: "孙权", flag: false, isDisplay: true, department: "计应教研室" },
      { name: "貂蝉", flag: false, isDisplay: true, department: "网络教研室" },
      { name: "马岱", flag: false, isDisplay: true, department: "信管教研室" },
      { name: "凌统", flag: false, isDisplay: true, department: "实验室" }
      ],
      selectSum: 0,
      maxSelectSum: 5,
      isSelected: false,
      isSelectedValue: '全部导师列表'
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
  //选中教师卡
  select: function(e){
    if (!this.data.teachers[e.currentTarget.id].flag && this.data.selectSum == this.data.maxSelectSum){
      return;
    }
    let teacherFlag = "teachers[" + e.currentTarget.id + "].flag";
    this.setData({
      [teacherFlag]: !this.data.teachers[e.currentTarget.id].flag
    })
    let selectSum = this.data.selectSum;
    if (this.data.teachers[e.currentTarget.id].flag){
      this.setData({
        selectSum : selectSum + 1
      })
    }else{
      this.setData({
        selectSum: selectSum - 1
      })
    }
  },
  //搜索框
  searchName: function(e){
    let re = RegExp(e.detail.value);
    for(let i = 0 ; i < this.data.teachers.length ; i ++){
      let teacherIsDisplay = "teachers[" + i + "].isDisplay";
      if(re.test(this.data.teachers[i].name)){
        this.setData({
          [teacherIsDisplay]: true
        })
      }else{
        this.setData({
          [teacherIsDisplay]: false
        })
      }
    }
  },
  selectList: function(e){
    let isSelected = this.data.isSelected;
    this.setData({
      isSelected : !isSelected
    })
  },
  changeDepartment: function(e){
    let isSelected = this.data.isSelected;
    let isSelectedValue = this.data.isSelectedValue;
    this.setData({
      isSelected : false,
      isSelectedValue : e.target.dataset.text
    })
  }
})
