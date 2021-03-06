const path = require('path');

module.exports = {
	entry: ['./src/index.ts'],
	devtool: 'inline-source-map',
	module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
			},
			{
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
				],
				exclude: /node_modules/,
      },
		],
	},
	resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './dist')
	},

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
	},
};