// pages/sort/sort.js
var startIndex;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teachers: [],
    y: 0,
    direction: "vertical",
    disabled: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    let teachers = this.data.teachers;
    let temp = [];
    for (let i = 0; i < 5; i++) {
      // 同步获取缓存 如果异步的话会导致temp数组为空
      try {
        let value = wx.getStorageSync('teacher' + i);
        value['y'] = 0;
        value['disabled'] = "";
        temp.push(value);
      } catch (e) {
        // Do something when catch error
        console.log(e);
      }
    }
    this.setData({
      teachers : temp
    })
    console.log(this.data.teachers);
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
  dragStart:function(e){
    console.log("start "+e.target.dataset.index);
    startIndex = e.target.dataset.index;
  },
  dragMove: function(e){
    console.log("index "+e.target.dataset.index);
    // console.log(e.detail.y);
    // console.log(e.detail.source);
    let y = e.detail.y;
    let teachers = this.data.teachers;
    // if(e.detail.y <= -25){
      let num = Math.abs(parseInt(y / 50));
      if(num > 0){
      console.log("num = " + num);
      let str = "teachers[" + (startIndex - num) + "]";
      let sumY = teachers[startIndex-num].y + 50;
      this.setData({
        [str + '.y']: sumY
        })
      }
    // }
  },
  dragStop:function(e){
  }
})