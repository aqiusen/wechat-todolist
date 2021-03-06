// pages/todolist/todolist.js
const app = getApp()
let resultSuccess = false;
Page({
  /**
   * 初始数据
   */
  data: {
    text: "this is a test",
    inputValue: "",
    list: [{
        desc: "todo list 1",
        isComplete: false
      },
      {
        desc: "todo list 2",
        isComplete: false
      }
    ]
  },
  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  addList() {
    if (!this.data.inputValue) {
      wx.showToast({
        title: '请输入添加内容',
        icon: 'none',
        duration: 500
      })
      return;
    }
    this.data.list.push({
      desc: this.data.inputValue,
      isComplete: false
    })
    this.setData({
      list: this.data.list,
      inputValue: ""
    })
  },
  deleteData(e) {
    const index = e.currentTarget.dataset.index;
    const newList = [...this.data.list];
    newList.splice(index, 1);
    this.setData({
      list: newList
    })
  },
  markComplete(e) {
    const index = e.currentTarget.dataset.index;
    const newList = [...this.data.list];
    newList[index].isComplete = true;
    this.setData({
      list: newList
    })
  },
  jumpToDeatil(e) {
    const index = e.currentTarget.dataset.index;
    console.log(app.globalData);
    const info = this.data.list[index];
    app.globalData.detailInfo = info;
    wx.navigateTo({
      url: '../detail/detail?desc=' + info.desc
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //调用刷新时将执行的方法
    this.onRefresh();
  },
  //刷新
  onRefresh() {
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading();
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: '加载中...',
    })
    this.getData().then(res => {
      if (!res) {
        wx.showToast({
          title: '数据为空',
          icon: 'error',
          duration: 2000
        })
        return;
      }
      const newList = res.map(item => {
        return {
          desc: item,
          isComplete: false
        }
      })
      this.setData({
        list: newList
      })
    }).catch(err => {
      {
        wx.showToast({
          title: err.errMsg,
          icon: 'error',
          duration: 1000
        })
      }
    });
  },
  //网络请求，获取数据
  getData() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'http://localhost:5000/list.json',
        //网络请求执行完后将执行的动作
        success(res) {
          console.log(res)
          if (res.statusCode === 200) {
            resolve(res.data.list);
            resultSuccess = true;
          } else {
            resolve(null);
          }
        },
        // 请求失败之后调用的函数
        fail: (error) => {
          console.log("error", error)
          resultSuccess = false
          reject(error)
        },
        complete: (res => {
          setTimeout(() => {
            if (resultSuccess) {
              //隐藏loading 提示框
              wx.hideLoading();
              //隐藏导航条加载动画
              wx.hideNavigationBarLoading();
            }

            //停止下拉刷新
            wx.stopPullDownRefresh();
          }, 500);
        })
      })
    })

  },

})