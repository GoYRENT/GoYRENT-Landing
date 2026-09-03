<!--
# Sync Impact Report (v1.1.0)
- Version change: 1.0.0 → 1.1.0 (MINOR: New principle VI. Testing & Quality Assurance added)
- List of modified principles:
  - I. Content-Driven Architecture (refined with non-negotiable rules)
  - II. Nuxt Ecosystem First (refined with explicit trade-offs)
  - III. Component Design System (refined with accessibility requirements)
  - IV. Nuxt Studio Compatibility (preserved with strict compliance)
  - V. Modern Frontend Standards (preserved with explicit standards)
  - VI. Testing & Quality Assurance (NEW: E2E, unit, visual regression, performance)
- Added sections: None (consolidated structure)
- Removed sections: None
- Templates requiring updates:
  - .specify/templates/plan-template.md (✅ Constitution Check aligns with testing gate)
  - .specify/templates/tasks-template.md (✅ Testing task categorization now explicit)
  - .specify/templates/spec-template.md (✅ User testing scenarios included)
- Follow-up TODOs: None
-->

# GoYRENT Landing Constitution

## Core Principles

### I. Content-Driven Architecture
All marketing, documentation, and blog content MUST be stored as Markdown/YAML in the content directory managed by Nuxt Content (v3). Separation of presentation and data is non-negotiable. Every content piece MUST be editable via Nuxt Studio without requiring code changes. Schema definitions MUST be explicit in nuxt.schema.ts.

### II. Nuxt Ecosystem First
Always use official Nuxt modules and proven community integrations before writing custom code. Current approved stack: Nuxt UI Pro, Nuxt Image, Nuxt Fonts, Pinia, VueUse. Before implementing a feature, verify it's not already available in the ecosystem. Document custom implementations with explicit trade-off rationale.

### III. Component Design System
All UI components MUST follow Nuxt UI Pro patterns and Shadcn-vue for extended functionality. The `Ui` prefix is required for Shadcn components in `app/components/ui/`. Accessibility (WCAG 2.1 AA) via Radix Vue is mandatory. All components MUST be responsive and mobile-first. Document component APIs with TypeScript interfaces.

### IV. Nuxt Studio Compatibility
Strict adherence to Nuxt Studio compatibility is non-negotiable. All components MUST work correctly in Studio preview mode. MDC components in markdown content MUST be explicitly declared. Content schemas MUST be defined in nuxt.schema.ts before components are used in content. Breaking Studio compatibility is a critical issue.

### V. Modern Frontend Standards (Nuxt 4)
Strict enforcement of Nuxt 4 best practices: strict mode enabled, directory structure conventions followed, composition API required. TypeScript is mandatory with no `any` types without explicit justification. ESLint rules MUST pass in CI/CD. Performance optimization mandatory: pre-rendering static pages, image optimization via Nuxt Image, lazy loading for components.

### VI. Testing & Quality Assurance
Testing is non-negotiable. All features MUST include unit tests, integration tests, and E2E coverage where applicable. Use Vitest for unit tests, Playwright for E2E. Maintain >80% code coverage. Perform visual regression testing for component changes. Performance budgets MUST be enforced with each release.

## Technology Stack

All decisions are locked to maintain ecosystem coherence. Custom tooling requires written justification in PR description.

- **Framework**: Nuxt 4 (strict mode)
- **Styling**: Tailwind CSS v4, Nuxt UI Pro v1+, Shadcn-vue
- **Content Management**: Nuxt Content v3 with MDC support
- **State Management**: Pinia (composables for local state)
- **Utilities**: VueUse, clsx, class-variance-authority
- **Image Optimization**: Nuxt Image with responsive formats
- **Icons**: Iconify with @iconify-json packages
- **Type Safety**: TypeScript 5.x (strict mode)
- **Linting**: ESLint v9, TypeScript ESLint
- **Package Management**: PNPM (lock file required)
- **OG Image Generation**: nuxt-og-image for social meta

## Development Workflow

All feature development MUST follow this cycle:

1. **Specification** (`/speckit.specify`): Define user stories, priorities, acceptance criteria
2. **Planning** (`/speckit.plan`): Research, architecture, data models, API contracts
3. **Implementation** (`/speckit.implement`): Code following constitution principles
4. **Testing** (`/speckit.checklist`): Unit + integration + E2E coverage, visual regression
5. **Release**: Conventional commits, semantic versioning tags

Content updates MUST be validated for Nuxt Studio compatibility before merge. All PRs MUST pass ESLint and TypeScript checks. Conventional commit format required: `type(scope): description`.

## Governance

This constitution is the source of truth for all development decisions. All six core principles are non-negotiable. Amendments require:

1. Version bump (MAJOR for principle removal/redefinition, MINOR for principle addition, PATCH for clarification)
2. Synchronization of dependent templates (plan, spec, tasks)
3. Update to this file with new Last Amended date

Constitution violations in PRs are grounds for rejection. The Spec-Plan-Implement cycle enforces compliance through each gate. **All changes to principles require team discussion and explicit consensus before merging.**

**Version**: 1.1.0 | **Ratified**: 2026-04-19 | **Last Amended**: 2026-04-20
