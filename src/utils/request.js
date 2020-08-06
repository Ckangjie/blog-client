import axios from 'axios'
import { getToken, removeToken } from './auth.js'
import store from '../store/index.js'
import { MessageBox, Message } from 'element-ui'

// create an axios instance
const service = axios.create({
	baseURL: process.env.NODE_ENV === 'production' ? 'http://192.168.0.118:8080/api' : process.env.VUE_APP_BASE_API,
	timeout: 5000 // request timeout
})

// 请求拦截
axios.interceptors.request.use(function (config) {
	if (store.state.user.token) {
		// 将token存入config.headers
		config.headers['token'] = JSON.parse(getToken()).token
		config.headers['user_id'] = JSON.parse(getToken()).id
	}
	return config
}, function (error) {

})

// response interceptor
axios.interceptors.response.use(
	response => {
		const res = response.data
		// if the custom status is not 200, it is judged as an error.
		if (res.status !== 200) {
			Message({
				message: res.message || 'Error',
				type: 'error',
				duration: 3 * 1000,
				center: true
			})
			// 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
			// res.status === 508 || res.status === 512 || res.status === 514
			if (res.status === 208) {
				// to re-login
				MessageBox.confirm('会话超时', {
					confirmButtonText: '重新登录',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					removeToken()
					// store.dispatch('user/resetToken').then(() => {
					//   location.reload()
					// })
				})
			}
			return false
		} else {
			if (res.message) {
				Message({
					message: res.message,
					type: 'success',
					duration: 3 * 1000,
					center: true
				})
			}
			return res
		}
	},
	error => {
		console.log(res)
		console.log('err' + error) // for debug
		if (res.message) {
			Message({
				message: error.message,
				type: 'error',
				duration: 3 * 1000,
				center: true
			})
		}
		return false
	}
)

export const get = (url, data) => {
	var path = sessionStorage.getItem('path')
	if (data) {
		data.path = path
	}
	return axios.get(url, {
		params: data
	})
}

export const post = (url, data) => {
	var path = sessionStorage.getItem('path')
	if (data) {
		data.path = path
	}
	return axios.post(url, data)
}
