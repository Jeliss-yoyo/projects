
module.exports = {
	/* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
	publicPath: './',
	/* 输出文件目录：在npm run build时，生成文件的目录名称 */
	outputDir: 'dist',
	/* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
	assetsDir: 'assets',
	productionSourceMap: false,
	/* 第三方插件配置 */
	pluginOptions: { // nouse
		'style-resources-loader': {
			preProcessor: 'less',
			patterns: []
		}
	},
	// 声明配置 webpack
	configureWebpack: {
		resolve: {
			// 配置路径别名
			alias: { // nouse
				'assets': '@/assets/'
			}
		}
	},
	devServer: {
		proxy: {
			'/api': {
				// 泰州研究决策的 swagger 地址
				target: "http://192.168.40.181:8088/",
				changeOrigin: true,
				pathRewrite: {
					"^/api": ""
				}
			}
		}
	}
}
