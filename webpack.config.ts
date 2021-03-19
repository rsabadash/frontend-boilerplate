import * as path from 'path';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import { options, webpackConfig } from './webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

export enum NodeEnvironment {
	Development = 'development',
	Production = 'production',
	Test = 'test'
}

declare global {
	namespace NodeJS {
		export interface ProcessEnv {
			NODE_ENV: NodeEnvironment;
		}
	}
}

const environment = process.env.NODE_ENV !== NodeEnvironment.Test && process.env.NODE_ENV || NodeEnvironment.Production;
const isDevelopment = environment === NodeEnvironment.Development;

const fileName = (extension: 'js') => isDevelopment ? `[name].${extension}` : `[name].[contenthash].${extension}`;

const config = merge<Configuration>(
	{
		mode: environment,
		// context: path.resolve(__dirname, 'src'),
		entry: path.resolve(__dirname, 'src/index.tsx'),
		output: {
			filename: fileName('js'),
			path: path.resolve(__dirname, 'dist'),
			assetModuleFilename: 'static/[hash][ext][query]',
			publicPath: './'
		},

		module: {
			rules: [
				{
					test: /\.(ts|js)x?$/,
					exclude: [/node_modules/, /coverage/, /webpack/],
					use: [
						{
							loader: 'babel-loader',
							options: options.babel
						}
					]
				},
				{
					test: /\.(png|jpg|jpeg|gif)$/i,
					type: 'asset/resource',
					generator: {
						filename: 'static/images/[hash][ext][query]'
					}
				}
			]
		},

		plugins: [
			new CleanWebpackPlugin(),
			new HTMLWebpackPlugin({
				template: path.resolve(__dirname, 'src/index.html'),
				filename: 'index.html'
			}),
			new ForkTsCheckerWebpackPlugin({
				async: false,
				// this options could be used instead of ESLintPlugin
				// eslint: {
				// 	files: path.resolve(__dirname, './src/**/*.{ts,tsx,js,jsx}'),
				// 	options: {
				// 		fix: true
				// 	}
				// }
			}),
			new ESLintPlugin({
				extensions: ['js', 'jsx', 'ts', 'tsx'],
				fix: true,
				lintDirtyModulesOnly: isDevelopment
			})
		],

		resolve: {
			extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
		}
	},
	webpackConfig[environment]
);

export default config;