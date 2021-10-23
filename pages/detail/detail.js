// pages/detail/detail.js
Page({
  //获取点击详情传递的数据
  onLoad: function(option){
      console.log("option=",option)
      this.setData({
        desc:option.desc
      })
  },
  /**
   * 初始数据
   */
  data: {
    desc:""
  },


})
