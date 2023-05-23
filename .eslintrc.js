/** @type {import('eslint').Linter.Config} */
module.exports = {
	extends: ["eslint-config-codely/typescript"],
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			parserOptions: {
				project: ["./tsconfig.json"],
			},
		},
	],
	rules: {
		"prettier/prettier": [
			"error",
			{
				endOfLine: "auto",
				printWidth: 100,
				useTabs: true,
			},
		],
	},
};
