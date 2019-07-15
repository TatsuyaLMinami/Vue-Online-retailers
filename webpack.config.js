var path = require("path");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = {
	//单入口
	entry:{
		main:"./main"
	},
	//存放打包后文件的输出目录
	output:{
		path: path.join(__dirname,"./dist"),
		//指定资源文件引用的目录
		publicPath: "/dist/",
		//指定输出文件的名称
		filename: "main.js"
	},
	performance: {
		hints: "warning", // 枚举
		maxAssetSize: 30000000, // 整数类型（以字节为单位）
		maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
		assetFilter: function(assetFilename) {
		// 提供资源文件名的断言函数
		return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
		
		}
	},
	mode:"production",
	module:{
		rules:[
			{
				test: /\.vue$/,
				/*use:["vue-loader",MiniCssExtractPlugin.loader,"css-loader","vue-style-loader"]*/
				loader: "vue-loader",
				options:{
					loaders:{
						css: {
							use:["css-loader"],
							fallback: "vue-style-loader"
						}
					}
				}
			},
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				 use : [
					MiniCssExtractPlugin.loader,
					{ loader: "css-loader" }
				]
			},
			{
				test:/\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
				loader:"url-loader?limit=1024"
			}
		]
	},
	plugins:[
		//重命名提取后的css文件
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: "main.css"
		}),
		
	]
};
