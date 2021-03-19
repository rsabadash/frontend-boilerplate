import { Configuration } from 'webpack';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const webpackProductionConfig: Configuration = {
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin(),
			'...' // syntax to extend default minimizer ('terser-webpack-plugin')
		],
	},

	module: {
		rules: [
			{
				test: /\.s[ac]ss$/,
				use: [
					MiniCSSExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[name]__[hash:base64:5]',
							},
							importLoaders: 1
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									[
										'autoprefixer'
									]
								]
							}
						}
					},
					'sass-loader'
				]
			},
		]
	},

	plugins: [
		new MiniCSSExtractPlugin()
	]
};

export default webpackProductionConfig;