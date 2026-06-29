---
name: source-register
description: Register a new worker source config file in the source registry.
---

# Source Register

- Use this skill when you need to add a new source.
- Inspect an existing `*.source.ts` implementation and follow the same conventions.

## Inputs

| Field     | Description               |
| --------- | ------------------------- |
| slug      | Source identifier         |
| name      | Display name              |
| url       | Source endpoint           |
| fetchType | RSS, HTML, API or Sitemap |
| enabled   | Boolean                   |

## Preconditions

- SourceConfig already exists.
- Source registry already exists.

## Steps

1. Inspect an existing `*.source.ts` implementation and follow the existing project conventions.
2. Create `apps/workers/sources/{slug}.source.ts`.
3. Populate the source using the template below.
4. Update `apps/workers/sources/registers/source.registry.ts`:
   - Add the import statement using the existing import ordering.
   - Register the source in the `SOURCES` array.
5. Return both modified files.

## Template

```ts
import type { SourceConfig } from "./registers/source.registry.js";

export const {camelCaseSlug}Source: SourceConfig = {
	slug: "{slug}",
	name: "{name}",
	url: "{url}",
	fetchType: "{fetchType}",
	enabled: {enabled},
};
```

## Example

Given:

| Field     | Description               |
| --------- | ------------------------- |
| slug      | github                    |
| name      | GitHub Blog               |
| url       | https://github.blog/feed/ |
| fetchType | RSS                       |
| enabled   | true                      |

Output:

```ts
import type { SourceConfig } from "./registers/source.registry.js";

export const githubSource: SourceConfig = {
	slug: "github",
	name: "GitHub Blog",
	url: "https://github.blog/feed/",
	fetchType: "RSS",
	enabled: true,
};
```

## Expected Output

The skill should produce:

- A new `apps/workers/sources/{slug}.source.ts` file.
- An updated `apps/workers/sources/registers/source.registry.ts` containing:
  - the new import
  - the new entry in the `SOURCES` array.

## Guardrails

- Always keep the export name in `{camelCaseSlug}Source` format.
- Always use `.js` extension in import paths to match the current codebase pattern.
- Do not add fields that are not in `SourceConfig`.
- Reuse existing project conventions.
- Do not modify unrelated source files.
- Do not change SourceConfig.
- Do not introduce additional properties.
- Preserve import ordering if the registry already follows one.
