import Mock from 'mockjs'

const data = {
	"id": "@guid",
	"name": "@cname",
};
let demoList = {
	status: 200,
	message: 'success',
	data: {
		total: 100,
		'rows|100': [{
			id: '@guid',
			name: '@cname',
			"start|1-10": "★",
			date: '@date',
			address: '@city',
			'age|20-30': 25,
			'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师']
		}]
	}
};
let chartsList = {
	status: 200,
	message: 'success',
	list: {
		"arr|1-7": [110, 225, 256, 320]
	}
}
// 文章列表
let articleList = {
	status: 200,
	// message: 'success',
	'item|20': [{
		'id|+1': 1,
		name: '@cname',
		title: '@csentence(20)',
		summary: '@cparagraph(10,15)',
		content: '@cparagraph(20,100)',
		link: '@url',
		date: '@date',
		time: '@datetime',
		images: "@image('200x100', '#06BE80', '#FFF', 'Mock.js')",
		readCount: '@integer(100,1500)',
		'skill|1': ['java', 'javascript', 'node.js', 'vue.js', 'react.js', 'css'],
		avatar() {
			//用户头像
			return Mock.Random.image('100×100', Mock.Random.color(), '#757575', 'png', this.name)
		}
	}]
}

let msg = {
	avatar() {
		//用户头像
		return Mock.Random.image('100×100', Mock.Random.color(), '#757575', 'png', this.name)
	}
}

Mock.mock('/api/query', demoList)
Mock.mock('/api/test', data)
Mock.mock('/api/charts', chartsList)
Mock.mock('/api/articleList', articleList)

export default Mock;
