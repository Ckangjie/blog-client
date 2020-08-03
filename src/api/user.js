import { get, post } from '../utils/request.js'
// 登录
export function login(data) {
  return post('/api/login', data)
}
// 注册
export function register(data) {
  return post('/api/register', data)
}
// 获取验证码
export function getCode(data) {
  return post('/api/getCode', data)
}
// 用户信息
export function getInfo(token) {
  return post('/api/userInfo',token)
}
// 退出登录
export function logout(data) {
  return post('/api/logout', data)
}
// 上传头像,用户名
export function saveInfo(data){
	return post('/api/saveInfo',data)
}

