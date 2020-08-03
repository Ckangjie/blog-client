import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
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


