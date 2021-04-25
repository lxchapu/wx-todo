const db = require("../../utils/db");
/* 添加群组 */
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 群组名称
    name: "",
    // 更多列表
    more: [],
    // 包含列表
    include: []
  },
  // 生命周期 页面加载
  onLoad() {
    var lists = db.List.queryAll();
    this.setData({
      more: lists
    })
  },
  // 点击创建 
  handleCreateTap() {
    var group = {
      id: Date.now(),
      name: this.data.name
    }
    db.Group.insertOne(group);
    db.List.updateGroup(this.data.include, group.id);
    wx.navigateBack();
  },
  // 输入名称 
  handleNameInput(event) {
    this.setData({
      name: event.detail.value
    })
  },
  // 点击包含
  handleContainTap() {
    wx.navigateTo({
      url: "include_list",
      events: {
        include: (data) => {
          this.setData({
            include: data.include,
            more: data.more
          })
        }
      },
      success: (res) => {
        res.eventChannel.emit("include", {
          include: this.data.include,
          more: this.data.more
        });
      }
    })
  }
})