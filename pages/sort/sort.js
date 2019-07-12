// pages/sort/sort.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teachers: [],
    isSwitch: false,
    notice: "各位同学请注意：导师顺序选择对最终导师分配结果有较大影响，请认真选择"
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
    // 公告动画
    let vm = this;
    setInterval(function(){
      var animation = wx.createAnimation({
        duration: 15000,
        timingFunction: 'linear',
        delay: 0
      });
      animation.translate("-280vw").step();
      vm.setData({
        ani: animation.export()
      })
    },1000)

    setInterval(function () {
      var animation1 = wx.createAnimation({
        duration: 1,
        timingFunction: 'step-start',
        delay: 0
      })
      animation1.translate(0).step();
      vm.setData({
        ani: animation1.export()
      })
    }, 10000)
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
  changeSwitch: function(e){
    this.setData({
      isSwitch: e.detail.value
    })
  }
})