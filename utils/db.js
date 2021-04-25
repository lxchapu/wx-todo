/* storage key name */
const DB_TODO = "todos";
const DB_LIST = "lists";
const DB_GROUP = "groups";
/* 提醒事项 */
var Todo = {};
/* 获取所有提醒事项 */
Todo.queryAll = function() {
  var todos = wx.getStorageSync(DB_TODO) || [];
  return todos;
}
/* 根据 id 获取提醒事项 */
Todo.queryById = function(id) {
  var todos = Todo.queryAll();
  const index = todos.findIndex(item => {
    return item.id === id;
  })
  if (index === -1) {
    return null;
  } else {
    return todos[index];
  }
}
/* 根据过滤函数查询提醒事项
filter: 过滤函数 */
Todo.queryByFilter = function(filter) {
  var todos = Todo.queryAll();
  todos = todos.filter(filter);
  return todos;
}
/* 根据 list_id 获取提醒事项 */
Todo.queryByListId = function(list_id) {
  return Todo.queryByFilter(item => {
    return item.list_id === list_id;
  });
}
/* 根据 id 删除提醒事项 */
Todo.deleteById = function(id) {
  var todos = Todo.queryAll();
  const index = todos.findIndex(item => {
    return item.id === id;
  })
  if (index !== -1) {
    todos.splice(index, 1);
    wx.setStorageSync(DB_TODO, todos)
  }
}
/* 添加提醒事项 */
Todo.insertOne = function(todo) {
  var todos = Todo.queryAll();
  todos.push(todo);
  wx.setStorageSync(DB_TODO, todos)
}
/* 清空提醒事项 */
Todo.clear = function() {
  wx.removeStorageSync(DB_TODO);
}
/* 列表 */
var List = {};
/* 获取所有列表 */
List.queryAll = function() {
  var lists = wx.getStorageSync(DB_LIST) || [];
  return lists;
}
/* 根据 id 获取列表 */
List.queryById = function(id) {
  var lists = List.queryAll();
  const index = lists.findIndex(item => {
    return item.id === id;
  })
  if (index === -1) {
    return null;
  } else {
    return lists[index];
  }
}
/* 根据 id 删除列表 */
List.deleteById = function(id) {
  var lists = List.queryAll();
  const index = lists.findIndex(item => {
    return item.id === id;
  })
  if (index !== -1) {
    lists.splice(index, 1);
    var todos = Todo.queryAll();
    todos = todos.filter(item => {
      return item.list_id !== id;
    })
    wx.setStorageSync(DB_LIST, lists);
    wx.setStorageSync(DB_TODO, todos);
  }
}
/* 添加列表 */
List.insertOne = function(list) {
  var lists = List.queryAll();
  lists.push(list);
  wx.setStorageSync(DB_LIST, lists)
}
/* 清空列表 */
List.clear = function() {
  wx.removeStorageSync(DB_LIST);
  Todo.clear();
}
/* 更新群组 */
List.updateGroup = function(up_lists, group_id) {
  var lists = List.queryAll();
  up_lists.forEach(up_item => {
    var index = lists.findIndex(item => {
      return item.id === up_item.id;
    })
    if (index !== -1) {
      lists[index].group_id = group_id;
    }
  })
  wx.setStorageSync(DB_LIST, lists);
}
/* 查询全部列表详情 */
List.queryAllDetail = function() {
  var lists = List.queryAll();
  var todos = Todo.queryAll();
  lists.forEach(item => {
    item.number = 0;
  })
  todos.forEach(item => {
    var index = lists.findIndex(l => {
      return l.id === item.list_id;
    })
    if (index !== -1) {
      lists[index].number += 1;
    }
  })
  return lists;
}

/* 群组 */
var Group = {};
/* 获取全部群组 */
Group.queryAll = function() {
  var groups = wx.getStorageSync(DB_GROUP) || [];
  return groups;
}
/* 添加群组 */
Group.insertOne = function(group) {
  var groups = Group.queryAll();
  groups.push(group);
  wx.setStorageSync(DB_GROUP, groups)
}
/* 查询全部群组详情
混合群组和列表 并返回 */
Group.queryAllDetail = function() {
  var detail = Group.queryAll();
  var lists = List.queryAllDetail();
  detail.forEach(item => {
    item.number = 0;
    item.role = "group";
    item.children = [];
  })
  lists.forEach(item => {
    if (item.group_id) {
      var index = detail.findIndex(g => {
        return g.role && g.role === "group" && g.id === item.group_id;
      })
      if (index !== -1) {
        detail[index].number += item.number;
        detail[index].children.push(item);
      }
    } else {
      detail.push(item)
    }
  })
  return detail;
}
module.exports = {
  Todo,
  List,
  Group
}