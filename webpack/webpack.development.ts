import * as path from 'path';
import { Configuration } from 'webpack';

const webpackDevelopmentConfig: Configuration = {
	devtool: 'eval-source-map',

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		historyApiFallback: true, // will redirect from 404 error to /index.html
		hot: true, // automatically enable webpack.HotModuleReplacementPlugin
		overlay: {
			warnings: true,
			errors: true,
		},
		port: 4200,
		stats: {
			colors: true,
		}
	},

	module: {
		rules: [
			{
				test: /\.s[ac]ss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[name]__[local]',
							},
							sourceMap: true,
							importLoaders: 1
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	}
};

export default webpackDevelopmentConfig;