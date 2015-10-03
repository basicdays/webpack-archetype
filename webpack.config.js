'use strict';
var path = require('path');
var util = require('util');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleTracker = require('webpack-bundle-tracker');

var assetsDir = path.resolve('./assets');
var buildDir = path.join(assetsDir, 'bundles');
var nodeModulesDir = path.resolve('./node_modules');

module.exports = {
	entry: {
		main: [
			'webpack/hot/dev-server',
			path.join(assetsDir, 'js/index.js'),
			path.join(assetsDir, 'less/main.less')
		]
	},
	output: {
		path: buildDir,
		filename: '[name].bundle.js',
		chunkFilename: '[id].chunk.js',
		publicPath: '/assets/bundles'
	},
	devServer: {
		//this option currently doesn't work for some reason, CLI works though
		//https://github.com/webpack/webpack-dev-server/issues/256
		hot: true,
		inline: true,
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: nodeModulesDir,
				loader: 'babel',
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract(
					'css?sourceMap!' +
					'autoprefixer?{browsers: "> 5%"}!' +
					'less?sourceMap'
				),
			},
			{
				test: /\.(png|jpe?g|gif)/,
				loader: 'url?limit=100000',
			},
			{
				test: /\.(eot|ttf|svg|woff2?)$/,
				loader: 'file?name=[name].[ext]',
			},
		],
	},
	plugins: [
		new ExtractTextPlugin('main.css'),
		new BundleTracker({filename: './webpack-stats.json'}),
	],
}
