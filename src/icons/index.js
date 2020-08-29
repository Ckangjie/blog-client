// 自定义全局组件
import Vue from "vue";
import svg from './svg.vue'
Vue.component('svg-icon', svg)

// 引入svg文件并解析
// require.context方法读取指定目录文件
// 第一个:文件目录
// 第二个:是否遍历子目录
// 第一个:定义遍历文件规则
let req = require.context('./svg', false, /\.svg$/)
let requireAll = requireConnext => {
	// console.log(requireConnext.keys())
	return requireConnext.keys().map(requireConnext)
}
requireAll(req)
