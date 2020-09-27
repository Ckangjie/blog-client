import axios from 'axios'
import { setToken, getToken, getUserId, removeToken } from './auth.js'
import store from '../store/index.js'
import { MessageBox, Message } from 'element-ui'
import qs from 'qs'
// create an axios instance
const service = axios.create({
	timeout: 5000 // request timeout
})
// 请求拦截
axios.interceptors.request.use(function (config) {
	if (store.state.user.token) {
		// 将token存入config.headers
		config.headers['token'] = getToken()
		config.headers['userid'] = getUserId()
		config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
	}
	return config
}, function (error) {

})

// response interceptor
axios.interceptors.response.use(
	response => {
		const res = response.data
		console.log(res)
		// if the custom status is not 200, it is judged as an error.
		if (res.status !== 200) {
			removeToken()
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
			// return false
		} else {
			if (res.message) {
				Message({
					message: res.message,
					type: res.type,
					duration: 2 * 1000,
					center: true
				})
			}
			return res
		}
	},
	error => {
		console.log('err' + error) // for debug
		if (res.message) {
			Message({
				message: error.message,
				type: 'error',
				duration: 2 * 1000,
				center: true
			})
		}
		return false
	}
)

export const get = (url, data) => {
	var path = sessionStorage.getItem('path'),
		http = process.env.NODE_ENV === 'development' ? '/api' + url : url;
	if (data) {
		data.path = path
	}

	return axios.get(http, {
		params: data
	})
}

export const post = (url, data) => {
	var path = sessionStorage.getItem('path'),
		http = process.env.NODE_ENV === 'development' ? '/api' + url : url;
	if (data) {
		data.path = path
	}

	return axios.post(http, qs.stringify(data))
}
