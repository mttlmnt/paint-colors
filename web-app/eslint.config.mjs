import eslint from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['dist/', 'build/', 'node_modules/']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      'react-hooks': reactHooks
    },
    rules: reactHooks.configs.recommended.rules
  },
  {
    files: ['*.config.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: {
        process: 'readonly'
      }
    }
  }
)
