console.log(process.env.VUE_APP_URL)
const path = require('path')
	, debug = process.env.NODE_ENV !== 'production';
//const VueConf = require('./src/assets/js/libs/vue_config_class')
//const vueConf = new VueConf(process.argv)
function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
	// publicPath: './', //vueConf.baseUrl, // 根域上下文目录
	publicPath: process.env.NODE_ENV === 'production' ? '' : './', //vueConf.baseUrl, // 根域上下文目录
	// publicPath: process.env.NODE_ENV === 'production' ? '' : './', //vueConf.baseUrl, // 根域上下文目录
	outputDir: 'dist', // 构建输出目录
	assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
	lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
	runtimeCompiler: true, // 运行时版本是否需要编译
	transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
	productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
	css: { // 配置高于chainWebpack中关于css loader的配置
		// modules: true, // 是否开启支持‘foo.module.css’样式
		extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
		sourceMap: false, // 是否在构建样式地图，false将提高构建速度
		loaderOptions: { // css预设器配置项
			sass: {
				prependData: `@import "@/style/main.scss";`
			}
		}
	},
	parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
	pluginOptions: { // 第三方插件配置
		'style-resources-loader': {
			preProcessor: 'less',
			patterns: [
				path.resolve(__dirname, './src/style/main.less')  // 自己添加的, less全局变量所在文件
			]
		}
	},
	pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
	},
	devServer: {
		open: true,
		host: '0.0.0.0',
		port: 8080,
		https: false,
		hotOnly: false,
		proxy: {
			[process.env.VUE_APP_URL]: {
				target: process.env.VUE_APP_API,
				ws: true,
				changOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_URL]: ''
				}
			}
		},
		before: app => { }
	},
	// 解析svg
	chainWebpack: (config) => {
		const svgRule = config.module.rule('svg');
		// 清除已有的所有 loader。
		// 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
		svgRule.uses.clear();
		svgRule
			.test(/\.svg$/)
			.include.add(path.resolve(__dirname, './src/icons/svg'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			});
		const fileRule = config.module.rule('file');
		fileRule.uses.clear();
		fileRule
			.test(/\.svg$/)
			.exclude.add(path.resolve(__dirname, './src/icons/svg'))
			.end()
			.use('file-loader')
			.loader('file-loader');
	}
}
