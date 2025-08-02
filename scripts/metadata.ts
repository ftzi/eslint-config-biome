/**
 * For future references:
 *
 * Origin: https://github.com/ftzi/eslint-config-biome/issues/5#issuecomment-2399547365
 * Rules Metadata: https://biomejs.dev/metadata/rules.json
 * Json Schema: https://biomejs.dev/metadata/schema.json
 * Tool to TS type, then requires manual changes: https://transform.tools/json-schema-to-typescript
 * Helper: https://10015.io/tools/json-tree-viewer
 */

import { z } from "zod"

const FixKindSchema = z.enum(["none", "safe", "unsafe"])
const RuleSourceKindSchema = z.enum(["sameLogic", "inspired"])

// Schema for rule source object (e.g., { "eslint": "no-console" })
const RuleSourceObjectSchema = z.record(z.string(), z.string())

// Schema for new Biome v2 rule source format
const RuleSourceSchema = z.object({
  kind: RuleSourceKindSchema,
  source: RuleSourceObjectSchema,
})

// Schema for individual rule
const RuleSchema = z.object({
  deprecated: z.boolean().optional(),
  version: z.string(),
  name: z.string(),
  link: z.string(),
  recommended: z.boolean(),
  fixKind: FixKindSchema,
  sources: z.array(RuleSourceSchema).optional(),
})

// Schema for the nested structure
const LanguageRulesSchema = z.record(
  z.string(),
  z.record(z.string(), RuleSchema),
)
const LintsSchema = z.object({
  languages: z.record(z.string(), LanguageRulesSchema),
})
const RulesMetadataSchema = z.object({
  lints: LintsSchema,
})

// Update RuleMetadata to match the new Zod schema
type RuleMetadata = z.infer<typeof RuleSchema>

const ruleSourceToPrefix: Record<string, string> = {
  eslint: "",
  eslintGraphql: "graphql/",
  eslintImport: "import/",
  eslintImportAccess: "import-access/",
  eslintJest: "jest/",
  eslintJsxA11y: "jsx-a11y/",
  eslintReact: "react/",
  eslintReactHooks: "react-hooks/",
  eslintReactRefresh: "react-refresh/",
  eslintSolid: "solid/",
  eslintSonarJs: "sonarjs/",
  eslintStylistic: "stylistic/",
  eslintTypeScript: "@typescript-eslint/",
  eslintUnicorn: "unicorn/",
  eslintUnusedImports: "unused-imports/",
  eslintMysticatea: "@eslint-community/eslint-plugin-mysticatea/",
  eslintBarrelFiles: "barrel-files/",
  eslintN: "n/",
  eslintNext: "@next/eslint-plugin-next/",
  eslintNoSecrets: "no-secrets/",
}

const skippedRulesSources = new Set<string>()

const usedRulesSources = new Set<string>()

const getEslintRulePrefix = (
  ruleSource: string,
  ruleName: string,
): string | undefined => {
  const rulePrefix = ruleSourceToPrefix[ruleSource]

  if (rulePrefix === undefined) {
    skippedRulesSources.add(ruleSource)

    return undefined
  }

  usedRulesSources.add(ruleSource)

  return `${rulePrefix}${ruleName}`
}

// Export the Zod-based type as RuleMetadata
export type { RuleMetadata }

const getAllRules = async (): Promise<Array<RuleMetadata>> => {
  const response = await fetch("https://biomejs.dev/metadata/rules.json")
  const rawData = await response.json()

  // Parse using Zod schema for type safety
  const parsedData = RulesMetadataSchema.parse(rawData)

  // Extract rules from nested structure
  const rules: Array<RuleMetadata> = []

  Object.values(parsedData.lints.languages).forEach((language) => {
    Object.values(language).forEach((category) => {
      Object.values(category).forEach((rule) => {
        rules.push(rule)
      })
    })
  })

  return rules
}

export const getRulesFromJsonMetadata = async (): Promise<Array<string>> => {
  const allRules = await getAllRules()

  const filteredRules = allRules.filter(
    (rule) => rule.recommended && rule.sources?.length,
  )

  const rulesToDisable: Array<string> = []

  filteredRules.forEach((rule) => {
    rule.sources?.forEach((ruleSource) => {
      // Handle new Biome v2 format with kind and source properties
      const sourceObj = ruleSource.source
      const key = Object.keys(sourceObj)[0]

      if (!key) throw new Error("Rule source has no key!")

      const val = sourceObj[key]

      if (!val) throw new Error("Rule source has no value!")

      const ruleToDisable = getEslintRulePrefix(key, val)

      if (ruleToDisable) rulesToDisable.push(ruleToDisable)
    })
  })

  console.warn(
    "Skipped the following rule sources:",
    [...skippedRulesSources.values()].sort(),
    "Expected: clippy, stylelint.",
  )

  console.info(
    "Used the following rule sources:",
    [...usedRulesSources.values()].sort(),
  )

  return rulesToDisable
}
