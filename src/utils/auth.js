import Cookies from 'js-cookie'
var millisecond = new Date().getTime(),
  // 20分钟
  expiresTime = new Date(millisecond + 60 * 1000 * 20);

export function setToken(token) {
  return Cookies.set('token', token, {
    expires: expiresTime,
  })
}
export function getToken() {
  return Cookies.get('token')
}
export function removeToken() {
  return Cookies.remove('token')
}
export function getUserId() {
  return Cookies.get('user')
}
export function setUserId(user) {
  return Cookies.set('user', user)
}
export function removeUserId() {
  return Cookies.remove('user')
}
export function setName(name) {
  return Cookies.set('name', name)
}
export function getName() {
  return Cookies.get('name')
}
export function removeName() {
  return Cookies.remove('name')
}

export function setAvatar(avatar) {
  return Cookies.set('avatar', avatar)
}
export function getAvatar() {
  return Cookies.get('avatar')
}
export function removeAvatar() {
  return Cookies.remove('avatar')
}

export function setUsername(username) {
  return Cookies.set('username', username)
}
export function getUsername() {
  return Cookies.get('username')
}
export function removeUsername() {
  return Cookies.remove('username')
}

