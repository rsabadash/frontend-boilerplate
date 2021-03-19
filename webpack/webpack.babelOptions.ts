const isTest = process.env.NODE_ENV === 'test';

export const babelOptions = {
	presets: [
		['@babel/preset-env',
			{
				useBuiltIns: 'usage',
				corejs: {
					version: 3,
					proposals: true
				},
				modules: isTest ? 'commonjs' : false,
				targets: {
					node: 'current'
				}
			}
		],
		[
			'@babel/preset-react',
			{
				runtime: 'automatic'
			}
		],
		'@babel/preset-typescript'
	],
	plugins: [
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-proposal-object-rest-spread',
		'@babel/plugin-proposal-class-properties',
		[
			'@babel/plugin-transform-react-jsx',
			{
				runtime: 'automatic'
			}
		],
		[
			'@babel/plugin-transform-runtime',
			{
				corejs: {
					version: 3,
					proposals: true
				}
			}
		]
	]
};

export default babelOptions;
