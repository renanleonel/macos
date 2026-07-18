# Documentation guide

This directory is the progressive-disclosure knowledge base for the repository. Start with the smallest document that matches the task instead of loading every reference.

## Read by task

| Task | Primary reference | Supporting reference |
| --- | --- | --- |
| Understand the product | [`../README.md`](../README.md) | [`../PRODUCT.md`](../PRODUCT.md), [`features/README.md`](features/README.md) |
| Understand visual intent | [`../DESIGN.md`](../DESIGN.md) | [`architecture/component-conventions.md`](architecture/component-conventions.md) |
| Trace application startup and composition | [`architecture/overview.md`](architecture/overview.md) | [`architecture/domain-and-state.md`](architecture/domain-and-state.md) |
| Add or move a module | [`architecture/project-structure.md`](architecture/project-structure.md) | [`architecture/component-conventions.md`](architecture/component-conventions.md) |
| Change state or domain behavior | [`architecture/domain-and-state.md`](architecture/domain-and-state.md) | [`architecture/runtime-and-persistence.md`](architecture/runtime-and-persistence.md) |
| Change persistence or browser integration | [`architecture/runtime-and-persistence.md`](architecture/runtime-and-persistence.md) | [`architecture/domain-and-state.md`](architecture/domain-and-state.md) |
| Change a simulated application | [`features/README.md`](features/README.md) | The owning architecture reference |
| Set up or validate the repo | [`development/workflow.md`](development/workflow.md) | [`architecture/refactor-verification.md`](architecture/refactor-verification.md) |
| Perform a structural refactor | [`architecture/refactor-verification.md`](architecture/refactor-verification.md) | All architecture references touched by the refactor |

## Document boundaries

- `README.md` explains the project to a new visitor or contributor.
- `PRODUCT.md` records audience, positioning, and product principles.
- `DESIGN.md` records visual direction and experience principles.
- `AGENTS.md` contains only durable instructions and routes agents here.
- `docs/architecture/` describes technical contracts and runtime behavior.
- `docs/features/` maps user-facing capabilities to their owners and source files.
- `docs/development/` describes repeatable repository workflows.

The repository intentionally does not use a `.codex/` or `agents/` documentation directory. `.codex` and `.agents` are gitignored local-tool surfaces; checked-in agent knowledge belongs in `AGENTS.md` and these linked references.

## Keeping documentation current

Update documentation in the same change when any of these contracts move:

| Change | Update |
| --- | --- |
| Script, package manager, build, or validation gate | Root `README.md`, `AGENTS.md`, and `development/workflow.md` |
| Feature behavior or content source | `features/README.md` and, when visitor-facing, root `README.md` |
| Feature boundary, import direction, or new folder role | `architecture/project-structure.md` and `architecture/overview.md` |
| Provider, context, state owner, reducer, or performance policy | `architecture/domain-and-state.md` |
| Storage key, default, browser API, external request, or lazy boundary | `architecture/runtime-and-persistence.md` |
| Styling, naming, accessibility, responsive, or motion convention | `architecture/component-conventions.md` and possibly `DESIGN.md` |
| Behavior-preservation or release checklist | `architecture/refactor-verification.md` |

Documentation should name concrete source files and runtime contracts. Avoid snapshots that become stale quickly, such as exhaustive file listings, dependency version copies outside the root README, or generated diagrams disconnected from the code.
