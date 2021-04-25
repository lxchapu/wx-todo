# todo

这是一个仿 iphone 中提醒事项的微信小程序，作为一个小程序练习项目，目的是为了尽可能在微信小程序还原提醒事项的功能和体验。

# 预览

<img src="https://cdn.jsdelivr.net/gh/chapubest/picBed/images/home.PNG" alt="首页" width="20%" />
<img src="https://cdn.jsdelivr.net/gh/chapubest/picBed/images/add_list.PNG" alt="添加列表" width="20%" />
<img src="https://cdn.jsdelivr.net/gh/chapubest/picBed/images/add_todo.PNG" alt="添加提醒事项" width="20%" />
<img src="https://cdn.jsdelivr.net/gh/chapubest/picBed/images/todo_detail.PNG" alt="提醒事项详情" width="20%" />

# 介绍

## 数据结构

```js
// 群组
group = {
  id: Date.now(),
  name: "名称"
}
// 列表
list = {
  id: Date.now(),
  name: "名称",
  color: "green",
  icon: "bookmark",
  group_id: null
}
// 提醒事项
todo = {
  id: Date.now(),
  title: "标题",
  remark: "备注",
  url: "链接",
  deadline: {
    enabled: true,
    year: 2021,
    month: 5,
    day: 1,
    hour: null,
    minute: null
  },
  repeat: {
    enabled: false
  },
  location: {
    enabled: false
  },
  sendMessage: {
    enabled: false
  },
  isFlag: false,
  level: 0,
  list_id: null
}
```