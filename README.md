# Gilded Rose Kata Challenge

This repository contains my TypeScript take on the classic Gilded Rose refactoring kata, prepared as part of a Qover challenge.

The goal is not just to "make the tests pass", but to work through a legacy code exercise with a clear approach:

- understand the existing behavior before changing it
- protect that behavior with tests and approvals
- refactor the update logic into something easier to reason about
- implement the missing `Conjured` behavior without breaking the existing rules
- document decisions, assumptions, and tradeoffs along the way

## The Challenge

The starting point is the standard Gilded Rose scenario: an inventory system updates item `sellIn` and `quality` values daily, with a few special item categories that behave differently.

Important constraints from the kata:

- normal items decrease in `quality` over time
- `Aged Brie` increases in `quality`
- `Backstage passes` increase as the concert approaches, then drop to `0`
- `Sulfuras` never changes
- `Conjured` items should degrade twice as fast as normal items
- `quality` is never negative
- `quality` never exceeds `50`, except `Sulfuras`, which stays at `80`
- the `Item` class must not be changed

The original kata requirements are captured in [`documentation/GildedRoseRequirements.md`](./documentation/GildedRoseRequirements.md).

## Approach

I am using this kata as a small but explicit engineering exercise:

- preserve behavior first with approval-style coverage
- add targeted unit tests for requirements and edge cases
- refactor only once behavior is better protected
- keep a written record of assumptions and decisions

Supporting notes for that process live in [`documentation/ProjectNotes.md`](./documentation/ProjectNotes.md).

## Branches

There are currently two relevant branches for this exercise:

- `main`: the simpler and more direct implementation approach
- `feature/generic-approach`: the more generic, config-driven implementation approach

## Project Structure

```text
.
|-- app/
|   |-- configs/
|   |   `-- quality.config.ts       # Shared quality bounds and constants
|   `-- gilded-rose.ts              # Item model and GildedRose update flow
|-- documentation/
|   |-- GildedRoseRequirements.md   # Kata rules and constraints
|   `-- ProjectNotes.md             # Plan, assumptions, and decisions
|-- test/
|   |-- golden-master-fixture.ts    # Golden master runner used by approval tests
|   `-- vitest/
|       |-- approvals.spec.ts       # Snapshot / approval-style verification
|       |-- rules/                  # Rule-focused unit tests by item category
|       `-- support/                # Shared test helpers
|-- package.json
|-- package-lock.json
|-- tsconfig.json
`-- vitest.config.ts
```

## Tooling

This repository is centered around:

- TypeScript for the implementation
- Vitest for automated tests and coverage
- a golden master fixture to compare behavior over multiple days

Some template files from the kata starter may still be present, but the active workflow in this repo is based on Vitest.

## Getting Started

Install dependencies:

```sh
npm install
```

Run the automated test suite:

```sh
npm run test
```

Run the golden master fixture:

```sh
npx ts-node test/golden-master-fixture.ts
```

Run the golden master for a custom number of days:

```sh
npx ts-node test/golden-master-fixture.ts 10
```
