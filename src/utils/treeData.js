/* 封装函数 */
/* 字段名以字符串的形式传入 */
let treeData = function(data, id, parentId, children) {
  let cloneData = JSON.parse(JSON.stringify(data))
  return cloneData.filter(father => {
    // 循环所有项，并添加children属性
    let branchArr = cloneData.filter(child => father[id] == child[parentId]); // 返回每一项的子级数组
    //给父级添加一个children属性，并赋值
    branchArr.length > 0 ? father[children] = branchArr : ''
    return father[parentId] == 0 //返回第一层
  })
}
// 导出
export {
  treeData
}
