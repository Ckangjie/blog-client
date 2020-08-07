import { get, post } from '../utils/request.js'
// 文章列表
export function getArticle(data) {
  return post('/article', data)
}
// 归档列表
export function getList(id) {
  return get('/articleList')
}
// 添加文章
export function saveArticle(data) {
  return post('/addArticle', data)
}
// 文章详情
export function getDetails(id) {
  return post('/getDetails', id)
}
// 文章阅读量
export function readCount(data) {
  return post('/readCount', data)
}
// 文章搜索
export function search(data) {
  return get('/search', data)
}
// 留言
export function comment(data) {
  return post('/comment', data)
}
// 留言列表
export function commentList(data) {
  return get('/commentList', data)
}