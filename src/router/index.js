import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/layout'

Vue.use(VueRouter)

const routes = [{
	path: '/',
	title: '首页',
	component: layout,
	redirect: '/dashboard',
	children: [{
		path: '/dashboard',
		component: () => import("../views/dashboard"),
		meta: {
			icon: 'menu',
			hidden: false
		},
	}, {
		path: '/details/:id',
		name: 'details',
		component: () => import("../views/dashboard/details"),
		meta: {
			icon: 'menu',
			hidden: true
		},
	}]
},
{
	path: '/archive',
	title: '归档',
	redirect: '/archive',
	component: layout,
	children: [{
		path: '/archive',
		component: () => import("../views/archive"),
		meta: {
			icon: 'menu',
			hidden: false
		},
	}]
}, {
	path: '/about',
	title: '留言',
	redirect: '/aboutMy',
	component: layout,
	children: [{
		path: '/aboutMy',
		component: () => import("../views/about"),
		meta: {
			icon: 'menu',
			hidden: false
		},
	}]
},
{
	path: '/release',
	title: '发布',
	redirect: '/release',
	component: layout,
	children: [{
		path: '/release',
		component: () => import("../views/release"),
		meta: {
			icon: 'menu',
			hidden: true
		},
	}]
},
{
	path: '/login',
	title: '登录',
	redirect: '/login',
	component: layout,
	children: [{
		path: '/login',
		component: () => import("../views/login"),
		meta: {
			icon: 'menu',
			hidden: true
		},
	}]
},
{
	path: '/user',
	title: '个人中心',
	redirect: '/user',
	component: layout,
	children: [{
		path: '/user',
		component: () => import("../views/user"),
		meta: {
			icon: 'menu',
			hidden: true
		},
	}]
},
]

const router = new VueRouter({
	mode: 'hash',
	// linkActiveClass: 'active',
	base: process.env.VUE_APP_URL,
	routes
})

export default router
