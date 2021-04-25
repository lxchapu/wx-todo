/* 添加群组 */
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 群组名称
    name: "",
    // 群组
    groups: [],
    // 更多列表
    more: [],
    // 包含列表
    include: []
  },
  // 生命周期 页面加载
  onLoad(options) {
    var lists = wx.getStorageSync("lists") || [];
    var groups = wx.getStorageSync("groups") || [];
    this.setData({
      groups: groups,
      more: lists
    })
  },
  // 点击创建 
  handleCreateTap() {
    var nGroup = {
      id: Date.now().toString(36),
      name: this.data.name
    }
    this.data.groups.push(nGroup)
    this.data.include.forEach(item => {
      item.group = nGroup.id;
    })
    wx.setStorage({
      key: "groups",
      data: this.data.groups
    })
    .then(res => {
      return wx.setStorage({
        key: "lists",
        data: this.data.more.concat(this.data.include)
      })
    })
    .then(res => {
      return wx.navigateBack()
    })
    .catch(err => {
      console.log(err)
    })
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