//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    teachers: [
      { name: "张三", flag: false , isDisplay: true, department: "基础教研室" , title:'副教授'},
      { name: "李四", flag: false, isDisplay: true, department: "基础教研室", title: '副教授'},
      { name: "王五", flag: false, isDisplay: true, department: "实验室", title: '高级实验师'},
      { name: "马超", flag: false, isDisplay: true, department: "网络教研室", title: '教授'},
      { name: "刘备", flag: false, isDisplay: true, department: "网络教研室", title: '讲师'},
      { name: "吕蒙", flag: false, isDisplay: true, department: "信管教研室", title: '高级工程师'},
      { name: "张机", flag: false, isDisplay: true, department: "信管教研室", title: '中级工程师'},
      { name: "关银屏", flag: false, isDisplay: true, department: "计应教研室", title: '高级工程师'},
      { name: "诸葛连弩", flag: false, isDisplay: true, department: "计应教研室", title: ''},
      { name: "孙权", flag: false, isDisplay: true, department: "计应教研室", title: '教授'},
      { name: "貂蝉", flag: false, isDisplay: true, department: "网络教研室", title: '助教'},
      { name: "马岱", flag: false, isDisplay: true, department: "信管教研室", title: '助教'},
      { name: "凌统", flag: false, isDisplay: true, department: "实验室", title: '中级实验师'}
      ],
      department: [
        '全部导师列表','基础教研室','计应教研室','网络教研室','信管教研室','实验室'
      ],
      selectSum: 0,
      maxSelectSum: 5,
      isSelected: false,
      isSelectedValue: '全部导师列表',
      fixed: false
  },
  //页面滑动 上方搜索以及选择栏固定
  onPageScroll:function(e){
    let fixed = this.data.fixed;
    // console.log(e);
    if(e.scrollTop > 55){
      this.setData({
        fixed : true
      })
    }else{
      this.setData({
        fixed: false
      })
    }
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    if(this.data.isSelected){
      wx.stopPullDownRefresh();
      return ;
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let arr = this.data.teachers;
    let temp = [];
    // 已选择的老师直接置顶 方便用户看
    for(let i = 0 ; i < arr.length ; i ++){
      if(arr[i].flag){
        temp.push(arr[i]);
        arr.splice(i,1);
        i --;
      }
    }
    // 随机列表
    let teachers = arr.sort(function () {
      return (0.5 - Math.random());
    })
    teachers = temp.concat(teachers);
    this.setData({ teachers });
    wx.stopPullDownRefresh();
    wx.hideLoading();
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
    let arr = this.data.teachers;
    let teachers = arr.sort(function(){
      return (0.5 - Math.random());
    })
    this.setData({teachers});
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
  //打开筛选栏
  selectList: function(e){
    //将页面强行回到最顶端
    wx.pageScrollTo({
      scrollTop: 0,
    })
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
  },
  submit: function(){
    let vm = this;
    if(vm.data.selectSum != vm.data.maxSelectSum){
      wx.showModal({
        title: '提交失败',
        content: '需要选择5名导师，当前已选择' + vm.data.selectSum + '名',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }else{
            console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.showLoading({
        title: '提交中',
        mask: true
      })
      var teachers = this.data.teachers;
      let num = 0;
      for(let i = 0 ; i < teachers.length ; i ++){
        if(teachers[i].flag){
          try {
            wx.setStorageSync('teacher' + num, teachers[i]);
          } catch (e) { 

          }
          num ++;
        }
      }
      setTimeout(function () {
        wx.hideLoading()
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 800,
          mask: true
        })
      }, 1000)
    }
  }
})
