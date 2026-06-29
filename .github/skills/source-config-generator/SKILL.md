---
name: source-config-generator
description: Generate a new worker source config file under apps/workers/sources and register it in the source registry.
---

# Source Config Generator

Use this skill when you need to add a new source file similar to `apps/workers/sources/github.source.ts`.

## Inputs

- `slug` (example: `github`)
- `name` (example: `GitHub Blog`)
- `url` (example: `https://github.blog/feed/`)
- `fetchType` (`RSS` | `API` | `HTML`)
- `enabled` (`true` or `false`)

## Steps

1. Create `apps/workers/sources/{slug}.source.ts`.
2. Use the file template below and keep the same naming convention.
3. Update `apps/workers/sources/registers/source.registry.ts`:
   - Add import: `import { {camelCaseSlug}Source } from "../{slug}.source.js";`
   - Add `{camelCaseSlug}Source` to the `SOURCES` array.

## Template

```ts
// fetchers/{slug}.source.ts
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

- `slug`: `github`
- `name`: `GitHub Blog`
- `url`: `https://github.blog/feed/`
- `fetchType`: `RSS`
- `enabled`: `true`

Output:

```ts
// fetchers/github.source.ts
import type { SourceConfig } from "./registers/source.registry.js";

export const githubSource: SourceConfig = {
	slug: "github",
	name: "GitHub Blog",
	url: "https://github.blog/feed/",
	fetchType: "RSS",
	enabled: true,
};
```

## Guardrails

- Always keep the export name in `{camelCaseSlug}Source` format.
- Always use `.js` extension in import paths to match the current codebase pattern.
- Do not add fields that are not in `SourceConfig`.
