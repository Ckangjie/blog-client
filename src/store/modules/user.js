import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, setName, setUserId, setAvatar, getAvatar, getUserId, getName, removeName, removeAvatar, setUsername, getUsername, removeUsername } from '@/utils/auth'
import router, { resetRouter } from '@/router'
const state = {
  token: getToken(),
  name: getName() ? getName() : '',
  avatar: getAvatar(),
  introduction: '',
  roles: [],
  username: getUsername(),
  id: getUserId() ? getUserId() : 0
}

const mutations = {
  SET_TOKEN: (state, data) => {
    state.token = data.token
    state.id = data.id
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        if (data) {
          commit('SET_TOKEN', { "token": data.token, 'id': data.id })
          setToken(data.token)
          setUserId(data.id)
          resolve(response)
        }
        return false
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        const { data } = res
        removeAvatar()
        // 用户名
        if (data.username.length === 0 || data.username === 'null') {
          data.username = 'giao人'
        } else {
          setUsername(data.username)
        }
        // 头像
        if (data.avatar.length === 0 || data.avatar === 'null') {
          data.avatar = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
        } else {
          setAvatar(data.avatar)
        }
        setAvatar(data.avatar)
        setUsername(data.username)
        setName(data.name)
        commit('SET_AVATAR', data.avatar)
        commit('SET_USERNAME', data.username)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout({ token: state.token }).then((res) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken('token')
        removeAvatar('avatar')
        removeName('name')
        // resetRouter()
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },
  // 修改信息
  saveInfo({ commit }, data) {
    console.log(5)
    return new Promise((resolve, reject) => {
      saveInfo(data).then(res => {
        resolve(res)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
