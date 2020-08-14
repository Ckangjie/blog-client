import { search, getTotal, getArticle, comment, commentList } from '@/api/article'
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    searchList: [],
    showSearch: true,
    list: [],
    total: 0,
    commentList: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
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
    // 搜索列表
    SET_ARTICLE: (state, data) => {
        if (data.length > 0) {
            state.searchList = data
        } else {
            state.searchList = [{ title: ' ' }]
        }
    },
    // 文章列表
    SET_LIST: (state, data) => {
        state.list = data
    },
    // 文章数量
    SET_TOTAL: (state, data) => {
        state.total = data
    },
    SET_SHOWSEARCH: (state, data) => {
        state.showSearch = data
    },
    SET_COMMENTLIST: (state, data) => {
        state.commentList = data
    }
}

const actions = {
    // 列表分页
    getArticle({ commit }, data) {
        return new Promise((resolve, reject) => {
            getArticle(data).then(res => {
                commit('SET_TOTAL', res.total)
                commit('SET_LIST', res.data)
                resolve(res)
            })
        })
    },
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response

                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                const { roles, name, avatar, introduction } = data

                // roles must be a non-empty array
                if (!roles || roles.length <= 0) {
                    reject('getInfo: roles must be a non-null array!')
                }

                commit('SET_ROLES', roles)
                commit('SET_NAME', name)
                commit('SET_AVATAR', avatar)
                commit('SET_INTRODUCTION', introduction)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resetRouter()

                // reset visited views and cached views
                // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
                dispatch('tagsView/delAllViews', null, { root: true })

                resolve()
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
    // 搜索
    search({ commit }, data) {
        return new Promise((resolve, reject) => {
            search(data).then(res => {
                resolve(res.data)
                commit('SET_ARTICLE', res.data)
            })
        })
    },
    // 留言
    addComment({ commit }, data) {
        return new Promise((resolve, reject) => {
            comment(data).then(res => {
                resolve(res.data)
            })
        })
    },
    // 留言列表
    commentList({ commit }, data) {
        return new Promise((resolve, reject) => {
            commentList(data).then(res => {
                resolve(res.data)
                commit('SET_COMMENTLIST', res.data)
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
