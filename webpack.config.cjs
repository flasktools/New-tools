const path = require('path');
const { UserscriptPlugin } = require('webpack-userscript');

module.exports = {
	entry: './index.js',
	mode: 'production',
	output: {
		filename: 'the_script.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new UserscriptPlugin({
			headers: {
				name: 'The Script',
				author: 'Sau1707',
				description: 'A script for grepolis',
				version: '0.0.1',
				match: 'https://*.grepolis.com/game/*',
				require: 'http://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js',
			},
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};
