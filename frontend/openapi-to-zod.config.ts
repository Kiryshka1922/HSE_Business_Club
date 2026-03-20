import { defineConfig } from "@cerios/openapi-to-zod";

export default defineConfig({
  defaults: {
    mode: "strict",
    includeDescriptions: true,
    useDescribe: false,
    showStats: false,
    schemaType: "all",
  },
  specs: [
    {
      input: "../backend/openapi.yaml",
      outputTypes: "src/shared/schemas/schemas.ts",
    },
  ],
});
