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
    },
  },
]

export default eslintConfig
