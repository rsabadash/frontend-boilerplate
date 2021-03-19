import { Configuration } from 'webpack';
import babelOptions from './webpack.babelOptions';
import webpackDevelopmentConfig from './webpack.development';
import webpackProductionConfig from './webpack.production';

export enum WebpackEnvironment {
	Development = 'development',
	Production = 'production'
}

export const webpackConfig: Record<WebpackEnvironment, Configuration> = {
	development: webpackDevelopmentConfig,
	production: webpackProductionConfig
};

export const options = {
	babel: babelOptions
};
