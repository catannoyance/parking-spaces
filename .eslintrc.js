module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "unused-imports"],
	rules: {
		"@typescript-eslint/no-unused-vars": "off",
		"unused-imports/no-unused-imports": [
			"warn",
			{
				vars: "all",
				varsIgnorePattern: "^_",
			},
		],
		"unused-imports/no-unused-vars": [
			"warn",
			{
				vars: "all",
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
			},
		],
		"arrow-body-style": "warn",
	},
}
