// pages/list/include_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 更多列表
    more: [],
    // 包含列表
    include: []
  },
  /**
   * 生命周期 页面加载
   */
  onLoad: function (options) {
    this.getOpenerEventChannel().once("include", res => {
      this.setData({
        include: res.include,
        more: res.more
      })
    })
  },
  // 生命周期 页面卸载
  onUnload() {
    this.getOpenerEventChannel().emit("include", {
      include: this.data.include,
      more: this.data.more
    });
  },
  // 点击包含
  handleIncludeTap(event) {
    const index = event.currentTarget.dataset.index;
    var list = this.data.more.splice(index, 1)[0];
    this.data.include.push(list);
    this.setData({
      more: this.data.more,
      include: this.data.include
    })
  },
  // 点击排除
  handleExcludeTap(event) {
    const index = event.currentTarget.dataset.index;
    var list = this.data.include.splice(index, 1)[0];
    this.data.more.push(list);
    this.setData({
      more: this.data.more,
      include: this.data.include
    })
  }
})