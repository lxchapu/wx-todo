const util = require("../../utils/util.js");
const db = require("../../utils/db");
/* 首页 */
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
    // 群组和列表
    listAndGroup: [],
    // 展开的群组
    unfoldGroupIndex: -1,
  },
  // 生命周期 页面显示
  onShow() {
    var listAndGroup = db.Group.queryAllDetail();
    this.setData({
      listAndGroup: listAndGroup
    })
    this.queryStatistic();
  },
  /* 查询统计 */
  queryStatistic() {
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
  handleNavigatorTap(event) {
    const index = event.currentTarget.dataset.index;
    const url = util.buildURL("/pages/todo/detail", {
      name: this.data.todoType[index].name
    })
    wx.navigateTo({
      url: url,
    })
  },
  // 点击群组
  handleGroupTap(event) {
    const index = event.currentTarget.dataset.index;
    if (this.data.unfoldGroupIndex == index) {
      this.setData({
        unfoldGroupIndex: -1
      })
    } else {
      this.setData({
        unfoldGroupIndex: index
      })
    }
  },
  // 点击删除群组
  handleDeleteGroupTap(event) {
    const index = event.target.dataset.index;
    wx.showActionSheet({
      alertText: "选择是否保留或删除此群组的列表及其所含提醒事项。",
      itemList: ["仅删除群组","删除群组和列表"],
      itemColor: "#3478f6",
      success: res => {
        console.log(res.tapIndex,index);
      }
    })
  },
  // 点击删除列表
  handleDeleteListTap(event) {
    const index = event.target.dataset.index;
    wx.showActionSheet({
      alertText: "是否删除此列表及其所含提醒事项？",
      itemList: ["确定"],
      itemColor: "#3478f6",
      success: res => {
        if (res.tapIndex==0) {
          if (this.data.listAndGroup[index].role == "group") {
            this.data.listAndGroup[index].children.splice(event.target.dataset.groupIndex, 1);
          } else {
            this.data.listAndGroup.splice(index, 1);
          }
          this.setData({
            listAndGroup: this.data.listAndGroup
          })
        }
      }
    })
  },
})