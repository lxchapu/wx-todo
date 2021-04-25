// pages/todo/belong_list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 列表
    lists: [],
    belongList: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      lists: wx.getStorageSync("lists") || []
    })
    this.getOpenerEventChannel().once("setBelongList", res => {
      this.setData(res)
    })
  },
  // 点击列表
  handleListTap(event) {
    const index = event.currentTarget.dataset.index;
    this.getOpenerEventChannel().emit("setBelongList", {
      belongList: this.data.lists[index]
    })
    wx.navigateBack();
  }
})