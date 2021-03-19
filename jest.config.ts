export default {
	moduleNameMapper: {
		'\\.(scss|css)$': 'identity-obj-proxy',
		'\\.(jpg|jpeg|png|gif)$': '<rootDir>/src/__mocks__/fileMock.ts'
	},
	setupFilesAfterEnv: [
		'@testing-library/jest-dom/extend-expect',
	],
	collectCoverageFrom: [
		'**/src/**/*.{ts,tsx,js,jsx}'
	],
	testPathIgnorePatterns: [
		'<rootDir>/dist/',
		'<rootDir>/node_modules/',
		'<rootDir>/webpack/',
		'<rootDir>/coverage/'
	]
};
