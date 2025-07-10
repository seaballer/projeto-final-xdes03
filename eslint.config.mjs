import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      // Desliga a regra que proíbe o uso de type 'any', já que usamos algumas vezes
      "@typescript-eslint/no-explicit-any": "off",
    }
  }
];

export default eslintConfig;
