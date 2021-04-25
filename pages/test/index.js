const db = require("../../utils/db")
Page({
  onShow() {
    console.log(db.Todo.queryByListId(1619333102780))
    console.log(db.List.queryAllDetail())
    console.log(db.Group.queryAllDetail())
  }
})