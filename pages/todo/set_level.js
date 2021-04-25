/* 选择优先级 */
Page({
  data: {
    levelList: ["无","低","中","高"],
    level: null
  },
  onLoad: function () {
    this.getOpenerEventChannel().once("setLevel", res => {
      this.setData(res)
    })
  },
  // 点击优先级
  handleLevelTap(event) {
    const index = event.currentTarget.dataset.index;
    this.getOpenerEventChannel().emit("setLevel", {
      level: this.data.levelList[index]
    })
    wx.navigateBack();
  }
})