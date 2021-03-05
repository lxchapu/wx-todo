// pages/home/index.js
const util = require("../../utils/util.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 搜索框聚焦
    searchFocus: false,
    // 隐藏搜索框清除按钮
    searchClearHide: true,
    // 搜索框内容
    searchText: "",
    // 编辑状态
    editstatus: false,
    // 统计
    statistics: [
      {
        name: "今天",
        icon: "today",
        color: "blue",
        number: 0,
        show: true
      }, {
        name: "计划",
        icon: "plan",
        color: "red",
        number: 0,
        show: true
      }, {
        name: "全部",
        icon: "all",
        color: "slate-grey",
        number: 0,
        show: true
      }, {
        name: "旗标",
        icon: "flag",
        color: "orange",
        number: 0,
        show: true
      }, {
        name: "已分配给我",
        icon: "mine",
        color: "green",
        number: 0,
        show: false
      }
    ],
    // 列表
    lists: []
  },
  // 生命周期 页面显示
  onShow() {
    // 读取列表
    wx.getStorage({
      key: "lists"
    }).then(res => {
      var lists = res.data;
      this.setData({
        lists: lists
      })
    }).catch(err => {
      console.log(err)
    });
  },
  handleSearchFocus() {
    this.setData({
      searchFocus: true
    });
    wx.setNavigationBarColor({
      backgroundColor: "#ffffff",
      frontColor: "#000000",
    });
  },
  handleSearchBlur(event) {
    this.setData({
      searchFocus: false
    });
    wx.setNavigationBarColor({
      backgroundColor: "#f2f2f7",
      frontColor: "#000000",
    });
  },
  handleSearchInput(event) {
    const inputText = event.detail.value;
    this.setData({
      searchClearHide: inputText == ""
    })
  },
  handleSearchClearTap(event) {
    this.setData({
      searchText: "",
      searchClearHide: true
    })
  },
  handleSearchCancelTap(event) {
    this.setData({
      searchText: "",
      searchClearHide: true
    })
  },
  handleEditTap() {
    this.setData({
      editstatus: !this.data.editstatus
    })
  },
  // 点击勾选统计
  handleShowTypeTap(event) {
    const index = event.target.dataset.index;
    this.data.statistics[index].show = !this.data.statistics[index].show;
    this.setData({
      statistics: this.data.statistics
    })
  },
  // 点击删除列表
  handleDeleteGroupTap(event) {
    const index = event.target.dataset.index;
    wx.showModal({
      title: "提示",
      content: "是否删除该列表",
      confirmColor: "#3478f6",
      success: res => {
        if (res.confirm) {
          this.data.lists.splice(index, 1);
          this.setData({
            lists: this.data.lists
          })
        }
      }
    });
  },
  handleNavigatorTap(event) {
    const index = event.currentTarget.dataset.index;
    const url = util.buildURL("/pages/todo/detail", {
      name: this.data.todoType[index].name
    })
    wx.navigateTo({
      url: url,
    })
  }
})