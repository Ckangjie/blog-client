import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken, removeUsername, removeName, removeUserId } from '@/utils/auth'
router.beforeEach(async (to, from, next) => {
    if (getToken() === undefined) {
        removeName()
        removeUserId()
        removeUsername()
    }
    if (to.path !== '/release' && to.path !== '/user') {
        sessionStorage.setItem('path', to.path)
        next()
    } else {
        if (typeof getToken() === 'string') {
            next()
        } else if (getToken() === undefined) {
            next('/dashboard')
        }
    }
    if (to.path === '/dashboard' || to.path === '/archive') {
        store.commit('article/SET_SHOWSEARCH', true)
    } else {
        store.commit('article/SET_SHOWSEARCH', false)
    }
})