module.exports = {
	"extends": ["eslint:recommended", "plugin:react/recommended"],
	"rules": {
		"indent": ["error", "tab"],
		"no-tabs": ["off"],
		"prefer-template": ["error"],
		"react/jsx-uses-vars": ["error"],
		"no-var": ["error"],
		"semi": ["error", "never"],
		"no-console": ["warn"],
		"prefer-arrow-callback": ["error"],
		"eqeqeq": ["warn", "always"],
		"keyword-spacing": ["error"],
		"brace-style": ["error", "1tbs"],
		"no-unused-vars": ["warn"],
		"react/prop-types": ["warn"]
	},
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true,
			"modules": true
		}
	},
	"plugins": [
		"json"
	],
	"env": {
		"browser": true,
		"node": true,
		"jasmine": true
	},
	"settings": {
		"react": {
			"version": "detect"
		}
	},
};
