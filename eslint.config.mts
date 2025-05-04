import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import { Linter } from "eslint"
import stylistic from "@stylistic/eslint-plugin"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

//
const eslintConfig: Linter.Config[] = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/semi": ["error", "never"],
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/member-delimiter-style": ["error", {
        multiline: {
          delimiter: "semi",
          requireLast: true,
        },
        singleline: {
          delimiter: "semi",
          requireLast: false,
        },
      }],
      "@typescript-eslint/no-unused-vars": ["error", {
        varsIgnorePattern: "^_|[iI]gnored",
        argsIgnorePattern: "^_|[iI]gnored",
      }],
    },
  },
]

export default eslintConfig
