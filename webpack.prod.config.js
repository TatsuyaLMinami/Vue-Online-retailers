var webpack = require("webpack");
var htmlWebpackPlugin = require("html-webpack-plugin");
/*var ExtractTextPlugin = require("extract-text-webpack-plugin");*/
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var merge = require("webpack-merge");
var webpackBaseConfig = require("./webpack.config.js");
var VueLoaderPlugin = require("vue-loader/lib/plugin");
/*const TerserPlugin = require('terser-webpack-plugin');*/
//清空基本配置的插件列表
webpackBaseConfig.plugins = [];

module.exports = merge(webpackBaseConfig,{
	output:{
		publicPath:"./dist/",
		//将入口文件重命名位带有20位hash值的唯一文件
		filename:"[name].[hash].js"
	},
	stats: { children: false },
	plugins:[
		new MiniCssExtractPlugin({
			//提取css，并重命名为20位hash值的唯一文件
			filename:"[name].[hash].css",
			allChunks:true
		}),
		//定义当前node环境为生产环境
		new webpack.DefinePlugin({
			"process.env":{
				NODE_ENV:"'production'"
			}
		}),
		//压缩js
		//webpack4.0   现在只要在script里面写成 "build": "webpack --mode production", 就自动压缩了
		/*new uglifyjs-webpack-plugin({
			compress:{
				warnings:false
			}
		}),*/
		//提取模板，并保存入口html文件
		new htmlWebpackPlugin({
			filename:"../index_prod.html",
			template:"./index.ejs",
			inject:false
		}),
		new VueLoaderPlugin(),
	]			
});