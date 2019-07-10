// pages/sort/sort.js
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
    
  },
  dragMove: function(e){
    
  },
  dragStop:function(e){

  }
})