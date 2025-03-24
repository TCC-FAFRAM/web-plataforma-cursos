module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    "parser": '@typescript-eslint/parser',
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "prettier/prettier": "error",
        "import/order": ["error", { "groups": ["builtin", "external", "internal"] }], 
        "jsdoc/check-alignment": "error", 
        "jsdoc/check-indentation": "error", 
    }
}
