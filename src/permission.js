import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken, removeUsername, removeName, removeUserId } from '@/utils/auth'
router.beforeEach(async (to, from, next) => {
    sessionStorage.setItem('path', to.path)
    if (to.path === '/login' && getToken() != undefined) {
        next('/dashboard')
    } else if (getToken() === undefined) {
        if (to.path === '/archive' || to.path === '/dashboard') {
            store.commit('article/SET_SHOWSEARCH', true)
        } else {
            store.commit('article/SET_SHOWSEARCH', false)
        }
        removeName()
        removeUsername()
        removeUserId()
        sessionStorage.removeItem('avatar')
        if (to.path === '/release' || to.path === '/user') {
            next('/dashboard')
        } else {
            next()
        }
    }
    else {
        next()
    }
})